"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">📞 연락하기</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>연락처 정보</CardTitle>
                <CardDescription>언제든 연락주세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">이메일</p>
                    <p className="text-muted-foreground">hdseo@devmine.co.kr</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Instagram className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">인스타그램</p>
                    <p className="text-muted-foreground">@hyodaseo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">주소</p>
                    <p className="text-muted-foreground">김포한강5로 321, 김포한강듀클래스 1261호</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>문의하기</CardTitle>
                <CardDescription>메시지를 남겨주시면 답변 드리겠습니다</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">이름</label>
                    <Input id="name" placeholder="이름을 입력하세요" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">이메일</label>
                    <Input id="email" type="email" placeholder="이메일을 입력하세요" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">메시지</label>
                    <Textarea id="message" placeholder="메시지를 입력하세요" className="min-h-[150px]" />
                  </div>
                  <Button className="w-full">메시지 보내기</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>오시는 길</CardTitle>
              <CardDescription>김포한강듀클래스 위치 안내</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.1234567890123!2d126.6383355!3d37.6529339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c8126e89ec6c1%3A0x2f704fb290970ccf!2z6rmA7Y-s7ZWc6rCV65OA7YG0656Y7Iqk!5e0!3m2!1sko!2skr!4v1709791234567!5m2!1sko!2skr"
                  className="w-full h-full absolute inset-0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 