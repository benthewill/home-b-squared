// "use client";
// import { cn } from "@/utils/cn";
import StoryCard from "@/components/stories/StoryCard";
import { createClient } from "@/utils/client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const metadata = {
  title: "Ben's Stories",
  description: "Portfolio for Ben's stories",
};

export default async function Stories() {
  const supabase = createClient();
  const storiesIntro =
    "Oh, are you lost on your journey? No matter; today’s lost are conquerors tomorrow. It only demonstrates the makings of a champion.";

  let { data: stories_titles } = await supabase
    .from("stories_titles")
    .select(
      "story_id, title, genres, premise, misc, latest_draft, type, stage",
    );

  return (
    <div className="w-full">
      <div className="relative z-10 mx-auto mb-24 w-full p-2 text-zinc-300 md:mb-60 md:pt-0">
        <TextGenerateEffect
          className="mb-10 bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text pt-10 text-left text-3xl font-black md:text-7xl"
          words={storiesIntro}
        />
        <TextGenerateEffect
          classname="text-xl font-light"
          staggerDur={2}
          words="- Pyromancer Karla"
        />
      </div>
      <TextGenerateEffect
        className="p-2 text-left text-2xl font-black md:pt-0 md:text-5xl"
        staggerDur={3}
        words="All Stories"
      />
      <p className="p-2 text-left text-lg font-black md:pt-0 md:text-xl"></p>
      <div className="mx-auto flex h-full flex-wrap gap-2 align-middle text-zinc-100 md:gap-0">
        {stories_titles.map((item, index) => (
          <StoryCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
