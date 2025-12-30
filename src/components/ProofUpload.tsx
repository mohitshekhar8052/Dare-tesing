"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore"
import { 
  Upload, 
  Camera, 
  Video, 
  X, 
  Check,
  Image as ImageIcon,
  Loader
} from "lucide-react"

interface ProofUploadProps {
  dareId: string
  dareTitle: string
  userId: string
  onClose: () => void
  onSuccess?: () => void
}

export default function ProofUpload({ dareId, dareTitle, userId, onClose, onSuccess }: ProofUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setError("Please select an image or video file")
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB")
      return
    }

    setSelectedFile(file)
    setError("")

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile && !description.trim()) {
      setError("Please provide either a file or description")
      return
    }

    setLoading(true)
    setError("")

    try {
      // For now, we'll store the proof submission with a placeholder for the file
      // In production, you'd upload to Firebase Storage first
      const proofData = {
        dareId,
        userId,
        description: description.trim(),
        fileName: selectedFile?.name || "",
        fileType: selectedFile?.type || "",
        fileSize: selectedFile?.size || 0,
        status: "pending", // pending, approved, rejected
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      // Add proof submission to Firestore
      await addDoc(collection(db, "proofs"), proofData)

      // Update dare completion count
      const dareRef = doc(db, "dares", dareId)
      await updateDoc(dareRef, {
        completions: increment(1),
        updatedAt: serverTimestamp()
      })

      // Update user stats
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        "stats.daresCompleted": increment(1),
        updatedAt: serverTimestamp()
      })

      if (onSuccess) {
        onSuccess()
      }
      
      onClose()
    } catch (err: any) {
      console.error("Error submitting proof:", err)
      setError(err.message || "Failed to submit proof")
    } finally {
      setLoading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Submit Proof</h2>
            <p className="text-sm text-slate-600 mt-1">{dareTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Upload Photo or Video
            </label>
            
            {!selectedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="flex justify-center gap-4 mb-4">
                  <Camera className="w-10 h-10 text-slate-400" />
                  <Video className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium mb-1">Click to upload</p>
                <p className="text-sm text-slate-500">Image or video (max 10MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative rounded-xl border border-slate-200 overflow-hidden">
                {selectedFile.type.startsWith('image/') ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-slate-100 flex items-center justify-center">
                    <Video className="w-16 h-16 text-slate-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="p-3 bg-slate-50 border-t border-slate-200">
                  <p className="text-sm text-slate-700 font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your experience completing this dare..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              maxLength={500}
            />
            <p className="text-xs text-slate-500 mt-1">{description.length}/500 characters</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (!selectedFile && !description.trim())}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Submit Proof
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
