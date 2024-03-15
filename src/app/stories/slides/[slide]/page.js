// "use server";

// export const dynamic = "force-dynamic"; // not sure if required
// export const runtime = "edge"; // not sure if required

import StorySlides from "@/components/stories/StorySlides";
import { createClient } from "@/utils/server";
import { parseForTexts, parseForSlides } from "@/utils/parse-points";
import GenreChips from "@/components/GenreChips";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cache } from "react";

// export async function generateMetadata({ params }) {
//   const stories_presentation_points = cache(async () => {
//     const supabase = await createClient();
//     let { data, error } = await supabase
//       .from("stories_presentation_points")
//       .select(
//         "line_number, indent_level, content, stories_titles(title, premise, genres, misc, latest_draft)",
//       )
//       // Filters
//       .eq("story_id", params.slide);
//     return data;
//   });

//   const storyMetadata = stories_presentation_points[0]?.stories_titles;

//   const storyTitle = storyMetadata.title;
//   return {
//     title: storyTitle,
//     description: "Portfolio for Ben's stories",
//   };
// }

export default async function Page({ params }) {
  const supabase = await createClient();
  let { data: stories_presentation_points, error } = await supabase
    .from("stories_presentation_points")
    .select(
      "line_number, indent_level, content, stories_titles(title, premise, genres, misc, latest_draft)",
    )
    // Filters
    .eq("story_id", params.slide);
  // const stories_presentation_points = cache(async () => {
  //   return data;
  // });

  const storyMetadata = stories_presentation_points[0]?.stories_titles;

  const storyTitle = storyMetadata.title;
  const storyGenres = storyMetadata.genres;
  const storyPremise = storyMetadata.premise;
  const storyDraft = storyMetadata.latest_draft;
  const storyType = storyMetadata.type;
  const storyStage = storyMetadata.stage;
  const storyDate = String(storyMetadata.created_at).substr(0, 9);

  const unparsedContent = stories_presentation_points;
  const sortedUnparsedContent = unparsedContent.sort(
    (a, b) => a.line_number - b.line_number,
  );

  const parsedContent = parseForSlides(sortedUnparsedContent);

  return (
    <div>
      <div className="h-auto w-full px-0 py-2 md:h-full md:px-20 md:py-10">
        <div className="-ml-4 md:ml-0">
          <GenreChips style="flat" size="sm" genreArray={storyGenres} />
        </div>
        <TextGenerateEffect
          className="mt-2 w-full pl-0 text-lg text-zinc-100 md:w-3/4 md:pl-0 md:text-xl"
          words={storyTitle}
        />
        <p className="text-sm font-thin">
          {storyStage} - {storyType}
        </p>
      </div>
      <StorySlides
        slidesData={parsedContent}
        storyID={params.slide}
        storyDraft={storyDraft}
        storyDate={storyDate}
      />
    </div>
  );
}
