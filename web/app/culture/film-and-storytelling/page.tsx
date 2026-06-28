import { redirect } from "next/navigation";

// Film & Storytelling has been merged into the Entertainment page.
export default function FilmAndStorytellingRedirect() {
  redirect("/culture/entertainment");
}
