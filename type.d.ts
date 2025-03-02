// 📌 Kakao API 전역 타입 선언
declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (params: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl?: string;
            link: { mobileWebUrl: string; webUrl: string };
          };
        }) => void;
      };
    };
  }
}

// 📌 파일이 모듈로 동작하도록 설정 (자동 글로벌 적용)
export { };
