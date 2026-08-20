import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Bắt buộc dùng khi component nhận `className` từ prop: nếu chỉ nối string,
 * class truyền vào KHÔNG override được class mặc định (cùng specificity).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
