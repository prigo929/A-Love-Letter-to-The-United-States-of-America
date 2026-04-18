import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "American Aesthetics",
  description:
    "An empty visual gallery scaffold for the American Aesthetics page.",
};

export default async function AmericanAestheticsPage() {
  const locale = await getServerLocale();
  const breadcrumbCulture = locale === "ro" ? "Cultură" : "Culture";
  const breadcrumbPage =
    locale === "ro" ? "Estetica Americană" : "American Aesthetics";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbCulture, href: "/culture" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[45vh] max-w-screen-xl rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
          {/* TODO: Drop in existing minimalist title here */}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
              {/* TODO: Create 5 empty left/right blocks. Drop in existing images and text for: 50s Diner, National Park Cabin, Industrial Loft, Nautical, and Route 66 Rec Room here */}
            </div>
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="order-2 min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 lg:order-1" />
            <div className="order-1 min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 lg:order-2" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8" />
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="order-2 min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 lg:order-1" />
            <div className="order-1 min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 lg:order-2" />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8" />
            <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8" />
          </div>
        </div>
      </section>
    </main>
  );
}
