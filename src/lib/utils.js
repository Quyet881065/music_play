import { clsx } from "clsx";  // Dùng để gộp các class name có điều kiện. Viết class có điều kiện gọn hơn 
import { twMerge } from "tailwind-merge" // Dùng để xử lý xung đột class của Tailwind.

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ...inputs → nhận danh sách class hoặc điều kiện class từ nhiều tham số.
// clsx(inputs) → gộp các class lại thành một chuỗi.
// twMerge(...) → xử lý chuỗi đó, loại bỏ xung đột class của Tailwind.
