"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Upload, Send, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface WriteReviewProps {
  open: string | null;
  onClose: () => void;
  productId: string;
}

interface ReviewImage {
  url: string;
  publicId: string;
  file: File;
  preview: string;
}

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

export default function WriteReview({
  open,
  onClose,
  productId,
}: WriteReviewProps) {
  const { customer } = useSelector((state: RootState) => state.auth);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const [images, setImages] = useState<ReviewImage[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  /**
   * Reset form.
   */
  const resetForm = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    setRating(0);
    setHoverRating(0);
    setTitle("");
    setComment("");
    setImages([]);
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Close modal.
   */
  const handleClose = () => {
    if (loading || uploading) return;

    resetForm();
    onClose();
  };

  /**
   * Upload images to Cloudinary through /api/upload.
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setError("");

    /**
     * Check maximum number of images.
     */
    if (images.length + files.length > MAX_IMAGES) {
      setError(`You can upload maximum ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    /**
     * Validate all files before uploading.
     */
    const invalidFile = files.find(
      (file) =>
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > MAX_FILE_SIZE,
    );

    if (invalidFile) {
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(invalidFile.type)
      ) {
        setError(`${invalidFile.name} is not a valid image.`);
      } else {
        setError(`${invalidFile.name} is larger than 1MB.`);
      }

      e.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const uploadPromises = files.map(async (file) => {
        const uploadData = new FormData();

        uploadData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result?.message || `Failed to upload ${file.name}`);
        }

        const secureUrl = result?.data?.secure_url;
        const publicId = result?.data?.public_id;

        if (!secureUrl || !publicId) {
          throw new Error(`Invalid upload response for ${file.name}.`);
        }

        return {
          url: secureUrl,
          publicId,
          file,
          preview: URL.createObjectURL(file),
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setImages((prev) => [...prev, ...uploadedImages]);
    } catch (error) {
      console.error("Upload failed:", error);

      setError(
        error instanceof Error ? error.message : "Failed to upload images.",
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setError("");

    setImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      return prev.filter((_, imageIndex) => imageIndex !== index);
    });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    /**
     * Validate product.
     */
    if (!productId) {
      setError("Product information is missing.");
      return;
    }

    /**
     * Validate rating.
     */
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    /**
     * Validate comment.
     */
    const trimmedComment = comment.trim();

    if (!trimmedComment) {
      setError("Please write your review.");
      return;
    }

    if (trimmedComment.length < 5) {
      setError("Review must contain at least 5 characters.");
      return;
    }

    if (trimmedComment.length > 3000) {
      setError("Review cannot exceed 3000 characters.");
      return;
    }

    /**
     * Validate title.
     */
    const trimmedTitle = title.trim();

    if (trimmedTitle.length > 150) {
      setError("Review title cannot exceed 150 characters.");
      return;
    }

    /**
     * Do not allow submit while images are uploading.
     */
    if (uploading) {
      setError("Please wait until image uploads are completed.");
      return;
    }

    try {
      setLoading(true);

      /**
       * Send JSON because images are already uploaded
       * to Cloudinary.
       */
      const payload = {
        productId,
        rating,
        title: trimmedTitle,
        comment: trimmedComment,
        images: images.length
          ? images.map((image) => ({
              url: image.url,
              publicId: image.publicId,
            }))
          : [],
        customerId: customer?.id,
      };

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to submit review.");
      }

      setSuccess("Thank you! Your review has been submitted successfully.");

      /**
       * Cleanup previews.
       */
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });

      setRating(0);
      setHoverRating(0);
      setTitle("");
      setComment("");
      setImages([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      /**
       * Close modal after success.
       */
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("Submit review error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Don't render when closed.
   */
  if (!open) return null;

  const isBusy = loading || uploading;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isBusy) {
          handleClose();
        }
      }}
    >
      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-[var(--surface)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 pb-3 pt-4 sm:px-7">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-[var(--primary)]">
              Write a Review
            </h2>

            <p className="mt-1 text-sm text-[var(--muted-text)]">
              Share your experience with this product
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted-text)] transition-all duration-200 hover:bg-[var(--background)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close review modal"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[calc(90vh-85px)] overflow-y-auto px-5 py-6 sm:px-7">
          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Rating */}
          <div className="mb-5">
            <label className="mb-1 block text-sm font-semibold text-[var(--text)]">
              Your Rating <span className="text-[var(--primary)]">*</span>
            </label>

            <div className="flex flex-wrap items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hoverRating || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isBusy}
                    className="cursor-pointer rounded-md p-1 transition-transform duration-200 hover:scale-110 disabled:cursor-not-allowed"
                    aria-label={`Rate ${star} out of 5`}
                  >
                    <Star
                      size={27}
                      strokeWidth={1.8}
                      className={
                        active
                          ? "fill-[var(--secondary)] text-[var(--secondary)]"
                          : "text-[var(--border)]"
                      }
                    />
                  </button>
                );
              })}

              <span className="ml-2 text-sm text-[var(--muted-text)]">
                {rating > 0 ? `${rating} out of 5` : "Select your rating"}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label
              htmlFor="review-title"
              className="mb-2.5 block text-sm font-semibold text-[var(--text)]"
            >
              Review Title
            </label>

            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isBusy}
              maxLength={150}
              placeholder="Summarize your experience"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--muted-text)]/70 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/10 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <div className="mt-1 text-right text-xs text-[var(--muted-text)]">
              {title.length}/150
            </div>
          </div>

          {/* Review */}
          <div className="mb-5">
            <label
              htmlFor="review"
              className="mb-2.5 block text-sm font-semibold text-[var(--text)]"
            >
              Your Review <span className="text-[var(--primary)]">*</span>
            </label>

            <textarea
              id="review"
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              disabled={isBusy}
              maxLength={3000}
              placeholder="Tell us what you liked or disliked about this product..."
              className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--text)] outline-none transition-all duration-200 placeholder:text-[var(--muted-text)]/70 focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--secondary)]/10 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <div className="mt-1 text-right text-xs text-[var(--muted-text)]">
              {comment.length}/3000
            </div>
          </div>

          {/* Upload Images */}
          <div className="mb-6">
            <label className="mb-2.5 block text-sm font-semibold text-[var(--text)]">
              Add Photos
              <span className="ml-1 font-normal text-[var(--muted-text)]">
                (Optional)
              </span>
            </label>

            <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--background)]">
              {/* Upload Area */}
              {images.length < MAX_IMAGES && (
                <label
                  htmlFor="review-images"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-transparent bg-[var(--surface)] px-5 py-5 text-center transition-all duration-200 hover:border-[var(--secondary)]/30 hover:bg-[#fffaf0]"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--background)]">
                    {uploading ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--secondary)]/30 border-t-[var(--secondary)]" />
                    ) : (
                      <Upload
                        size={20}
                        strokeWidth={1.8}
                        className="text-[var(--secondary)]"
                      />
                    )}
                  </div>

                  <p className="text-sm font-semibold text-[var(--text)]">
                    {uploading
                      ? "Uploading photos..."
                      : "Upload product photos"}
                  </p>

                  <p className="mt-1 text-xs text-[var(--muted-text)]">
                    JPG, PNG, WEBP up to 1MB each
                  </p>

                  <p className="mt-1 text-xs text-[var(--muted-text)]">
                    {images.length}/{MAX_IMAGES} photos selected
                  </p>

                  <input
                    ref={fileInputRef}
                    id="review-images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    disabled={isBusy}
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}

              {/* Maximum Images Message */}
              {images.length === MAX_IMAGES && (
                <div className="rounded-lg bg-[var(--surface)] px-4 py-3 text-center text-xs text-[var(--muted-text)]">
                  Maximum {MAX_IMAGES} photos selected.
                </div>
              )}

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <div
                      key={`${image.publicId}-${index}`}
                      className="group relative h-20 w-20 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                    >
                      <img
                        src={image.preview}
                        alt={`Review photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        disabled={isBusy}
                        className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[var(--primary)] text-white transition hover:bg-[#5f1717] disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {/* Cancel */}
            <button
              type="button"
              onClick={handleClose}
              disabled={isBusy}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition-all duration-200 hover:border-[var(--primary)]/30 hover:bg-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={rating === 0 || isBusy}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#641919] hover:shadow-md disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-[var(--muted-text)] disabled:shadow-none"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Submitting...
                </>
              ) : uploading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Uploading...
                </>
              ) : (
                <>
                  <Send size={17} strokeWidth={1.8} />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
