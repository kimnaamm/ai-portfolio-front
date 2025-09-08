import axios from "axios"
import { ref } from 'vue'


const API_BASE_URL = "http://localhost:9090/api"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export interface ItemOriginId {
  cdVendor: string
  noItem: string
}

export interface ItemOrigin {
  id: ItemOriginId
  nmItemOrigin: string
  dsKeywords: string
  cdMycate: string
}

export const productApi = {
  // 모든 상품 조회
  getAllProducts: () =>
    apiClient.get<Page<ItemOrigin>>("/products"),

  // ID로 상품 조회 (path param)
  getProductById: (id: number) =>
    apiClient.get<ItemOrigin>(`/products/${id}`),

  // 카테고리별 상품 조회 (path param)
  getProductsByCategory: (category: string) =>
    apiClient.get<ItemOrigin[]>(`/products/category/${encodeURIComponent(category)}`),

  // 브랜드별 상품 조회 (path param)
  getProductsByBrand: (brand: string) =>
    apiClient.get<ItemOrigin[]>(`/products/brand/${encodeURIComponent(brand)}`),

  // 상태별 상품 조회 (path param)
  getProductsByStatus: (status: string) =>
    apiClient.get<ItemOrigin[]>(`/products/status/${encodeURIComponent(status)}`),

  // 상품명으로 검색 (query param 권장)
  searchProducts: (name: string) =>
    apiClient.get<ItemOrigin[]>("/products/search", { params: { name } }),

  // 상품 생성
  createProduct: (product: Omit<ItemOrigin, "itemId" | "createdAt" | "updatedAt">) =>
    apiClient.post<ItemOrigin>("/products", product),

  // 상품 수정
  updateProduct: (id: number, product: Omit<ItemOrigin, "itemId" | "createdAt" | "updatedAt">) =>
    apiClient.put<ItemOrigin>(`/products/${id}`, product),

  // 상품 삭제
  deleteProduct: (id: number) =>
    apiClient.delete<void>(`/products/${id}`),
}
