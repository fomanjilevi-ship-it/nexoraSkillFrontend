export interface Course {
  id: number
  slug: string
  title: string
  instructor: string
  thumbnail?: string
  rating: number
  reviewsCount: number
  studentsCount: number
  price: number
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  category: string
  technology?: string
  technologyLogos?: string[]
  technologyLogoColors?: string[]
  technologyColor?: string
  bestseller?: boolean
}
