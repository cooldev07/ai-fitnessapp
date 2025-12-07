"use client";

import React from "react";

type PlanCardProps = {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
};

export default function PlanCard({ title = "Plan", subtitle, children }: PlanCardProps) {
    // Structure-only: card that will display generated plan content
    return (
        <article className="w-full rounded-lg border p-4 shadow-sm">
            <header className="mb-2 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
            </header>
            <section className="prose max-w-none">{children ?? <p className="text-sm">No plan yet.</p>}</section>
        </article>
    );
}
