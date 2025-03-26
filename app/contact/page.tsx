"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-primary to-background text-center text-white">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          함께 성장하세요
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl mt-6">
          AI 기반 비즈니스 솔루션으로 당신의 성공을 돕습니다.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">연락처</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">이메일</h3>
                    <p className="text-muted-foreground">info@devminelab.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">전화</h3>
                    <p className="text-muted-foreground">+82 10-1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">주소</h3>
                    <p className="text-muted-foreground">서울특별시 강남구 테헤란로 123</p>
                  </div>
                </div>
              </div>

              {/* Expertise Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">커스텀 소프트웨어 개발</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">비즈니스에 최적화된 맞춤형 솔루션</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI 자동화</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">업무 효율화를 위한 AI 솔루션</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">디지털 전환</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">비즈니스 디지털화 전략</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">레거시 현대화</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">기존 시스템 개선 및 현대화</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>문의하기</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">이름</label>
                    <Input id="name" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">이메일</label>
                    <Input id="email" type="email" placeholder="example@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">메시지</label>
                    <Textarea id="message" placeholder="문의 내용을 입력해주세요." className="min-h-[150px]" />
                  </div>
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    보내기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 