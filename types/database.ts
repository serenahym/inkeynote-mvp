export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal'
export type ConcernCategory = 'acne' | 'pigmentation' | 'aging' | 'sensitivity' | 'dryness' | 'other'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type TimeOfDay = 'morning' | 'evening' | 'both'

export interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  skin_type?: SkinType
  created_at: string
  updated_at: string
}

export interface Concern {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  category?: ConcernCategory
  display_order: number
  created_at: string
}

export interface Ingredient {
  id: string
  name: string
  slug: string
  description?: string
  benefits?: string[]
  cautions?: string[]
  created_at: string
}

export interface Recipe {
  id: string
  title: string
  slug: string
  description?: string
  concern_id?: string
  difficulty?: Difficulty
  time_morning?: number
  time_evening?: number
  created_at: string
  updated_at: string
  concern?: Concern
}

export interface RecipeStep {
  id: string
  recipe_id: string
  step_number: number
  time_of_day: TimeOfDay
  title: string
  description?: string
  wait_time?: number
  tips?: string
  created_at: string
  ingredients?: RecipeIngredient[]
}

export interface RecipeIngredient {
  id: string
  recipe_step_id: string
  ingredient_id: string
  is_optional: boolean
  notes?: string
  ingredient?: Ingredient
}

export interface Review {
  id: string
  user_id: string
  recipe_id: string
  rating: number
  comment?: string
  skin_type?: string
  used_for_weeks?: number
  created_at: string
  updated_at: string
  profile?: Profile
}
