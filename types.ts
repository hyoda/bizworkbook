// 📌 워크북 타입
export interface Workbook {
  _id: string;
  title: string;
  description: string;
  steps: string[];
  tags: string[];
}

export interface User {
  email?: string;
  id: string;
}

// 📌 사용자 진행률 타입
export interface UserProgress {
  user_id: string;
  workbook_id: string;
  completed_steps: number[];
  last_updated: string;
}

// 📌 즐겨찾기 타입
export interface Favorite {
  user_id: string;
  workbook_id: string;
  created_at: string;
}

// 📌 피드백 타입 (별점 및 댓글)
export interface Feedback {
  user_id: string;
  workbook_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Notification {
  message: string;
  created_at: string;
}