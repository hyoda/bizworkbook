'use client';

import { useState } from 'react';


export default function ShareButton({ workbookId, title }: { workbookId: string; title: string }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const shareUrl = `${window.location.origin}/workbook/${workbookId}`;

  /** ✅ 클립보드에 URL 복사 */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('클립보드 복사 실패', error);
    }
  };

  /** ✅ SNS 공유 링크 생성 */
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: '이 워크북을 확인해보세요!',
          imageUrl: 'https://example.com/image.jpg', // 공유 이미지 (선택)
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
      });
    }
  };

  return (
    <div className="mt-6 flex space-x-4">
      {/* 📌 페이스북 공유 */}
      <button onClick={shareToFacebook} className="bg-blue-600 text-white px-4 py-2 rounded">
        Facebook 공유
      </button>
      {/* 📌 트위터 공유 */}
      <button onClick={shareToTwitter} className="bg-blue-400 text-white px-4 py-2 rounded">
        Twitter 공유
      </button>
      {/* 📌 카카오톡 공유 */}
      <button onClick={shareToKakao} className="bg-yellow-400 text-black px-4 py-2 rounded">
        카카오톡 공유
      </button>
      {/* 📌 링크 복사 */}
      <button onClick={copyToClipboard} className="bg-gray-600 text-white px-4 py-2 rounded">
        {copySuccess ? '복사 완료!' : '링크 복사'}
      </button>
    </div>
  );
}
