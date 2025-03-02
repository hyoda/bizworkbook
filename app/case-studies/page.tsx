"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CaseStudies() {
  interface CaseStudy {
    id: string;
    title: string;
    description: string;
    slug: string;
  }

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    async function fetchCaseStudies() {
      const { data, error } = await supabase.from("case_studies").select("id, title, description, slug");
      if (!error) {
        setCaseStudies(data || []);
      }
    }
    fetchCaseStudies();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-primary to-muted text-primary-foreground">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          📊 성공 사례 분석
        </h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed">
          실제 비즈니스 자동화와 마케팅 퍼널 구축 사례를 통해 성공 전략을 분석합니다.
        </p>
      </section>

      {/* Case Study List */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center">✅ 실제 적용된 성공 전략</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {caseStudies.length > 0 ? (
            caseStudies.map((study) => (
              <Card key={study.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{study.title}</CardTitle>
                  <CardDescription>{study.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost">
                    <Link href={`/case-studies/${study.slug}`}>
                      자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">아직 등록된 성공 사례가 없습니다.</p>
          )}
        </div>
      </section>
    </main>
  );
}
