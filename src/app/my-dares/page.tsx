"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore"
import { 
  Flame, 
  Users, 
  Camera, 
  Laugh, 
  Clock,
  Eye,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

interface Dare {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  coins: number
  timeLimit: string
  status: string
  participants: number
  completions: number
  createdAt: any
}

export default function MyDaresPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth(true, true)
  const [dares, setDares] = useState<Dare[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")

  const categoryIcons: any = {
    social: Users,
    fun: Laugh,
    creative: Camera,
    extreme: Flame
  }

  useEffect(() => {
    if (user) {
      loadMyDares()
    }
  }, [user, filter])

  const loadMyDares = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const daresRef = collection(db, "dares")
      let q = query(
        daresRef,
        where("createdBy", "==", user.uid),
        orderBy("createdAt", "desc")
      )

      if (filter !== "all") {
        q = query(
          daresRef,
          where("createdBy", "==", user.uid),
          where("status", "==", filter),
          orderBy("createdAt", "desc")
        )
      }

      const snapshot = await getDocs(q)
      const daresData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Dare[]

      setDares(daresData)
    } catch (error) {
      console.error("Error loading dares:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (dareId: string) => {
    if (!confirm("Are you sure you want to delete this dare?")) return

    try {
      await deleteDoc(doc(db, "dares", dareId))
      setDares(dares.filter(d => d.id !== dareId))
    } catch (error) {
      console.error("Error deleting dare:", error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200"
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white pt-20 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Dares</h1>
          <p className="text-slate-600">Manage the dares you've created</p>
        </div>

        {/* Filters & Create Button */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            All ({dares.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "pending"
                ? "bg-primary text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "approved"
                ? "bg-primary text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "rejected"
                ? "bg-primary text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
            }`}
          >
            Rejected
          </button>
          
          <button
            onClick={() => router.push("/create-dare")}
            className="ml-auto px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>

        {/* Dares List */}
        {dares.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-600 mb-4">No dares found</p>
            <button
              onClick={() => router.push("/create-dare")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all"
            >
              Create Your First Dare
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {dares.map((dare) => {
              const CategoryIcon = categoryIcons[dare.category] || Flame
              return (
                <div
                  key={dare.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CategoryIcon className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold text-slate-900">{dare.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(dare.status)}`}>
                          {getStatusIcon(dare.status)}
                          {dare.status}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 mb-4">{dare.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-slate-500">
                          <Users className="w-4 h-4" />
                          <span>{dare.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <CheckCircle className="w-4 h-4" />
                          <span>{dare.completions} completed</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span>{dare.timeLimit}</span>
                        </div>
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">
                          {dare.coins} coins
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/dares/${dare.id}`)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(dare.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
