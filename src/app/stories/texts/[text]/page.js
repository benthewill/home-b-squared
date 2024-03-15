// "use server";

// export const dynamic = "force-dynamic"; // not sure if required
// export const runtime = "edge"; // not sure if required

import { createClient } from "@/utils/server";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { parseForTexts } from "@/utils/parse-points";
import StoryTextContent from "@/components/stories/StoryTextContent";
import GenreChips from "@/components/GenreChips";

// export async function generateMetadata({ params }) {
//   const stories_presentation_points = cache(async() => {
//     const supabase = createClient();
//     let { data: stories_presentation_points, error } = await supabase
//       .from("stories_presentation_points")
//       .select(
//         "line_number, indent_level, content, stories_titles(title, premise, genres, misc, latest_draft, type, stage)",
//       )
//       // Filters
//       .eq("story_id", params.text);

//     return stories_presentation_points
//   })

//   const storyMetadata = stories_presentation_points[0]?.stories_titles;

//   const storyTitle = storyMetadata.title;
//   return {
//     title: storyTitle,
//     description: "Portfolio for Ben's stories",
//   };
// }

export default async function Page({ params }) {
  const supabase = createClient();
  let { data: stories_presentation_points, error } = await supabase
    .from("stories_presentation_points")
    .select(
      "line_number, indent_level, content, stories_titles(title, premise, genres, misc, latest_draft, type, stage, note)",
    )
    .eq("story_id", params.text);

  console.log(stories_presentation_points);

  const storyMetadata = stories_presentation_points[0]?.stories_titles;

  const storyTitle = storyMetadata.title;
  const storyGenres = storyMetadata.genres;
  const storyPremise = storyMetadata.premise;
  const storyDraft = storyMetadata.latest_draft;
  const storyType = storyMetadata.type;
  const storyStage = storyMetadata.stage;
  const storyNote = storyMetadata.note;
  const storyDate = String(storyMetadata.created_at).substr(0, 9);

  const unparsedContent = stories_presentation_points;
  const sortedUnparsedContent = unparsedContent.sort(
    (a, b) => a.line_number - b.line_number,
  );

  const parsedContent = parseForTexts(sortedUnparsedContent);

  return (
    <div className="h-full">
      <div className="mb-8 mt-32 flex flex-col pl-0 md:mb-16 md:pl-4">
        <div className="-ml-4 md:ml-0">
          <GenreChips style="flat" genreArray={storyGenres} />
        </div>
        <TextGenerateEffect
          className="mt-6 w-3/4 pl-0 text-5xl font-extrabold tracking-wide text-zinc-100 md:pl-0 md:text-8xl"
          words={storyTitle}
        />
        <TextGenerateEffect
          className="mt-2 w-3/4 pl-0 text-sm font-thin text-zinc-100 md:pl-0 md:text-xl"
          words={`${storyStage.charAt(0).toUpperCase() + storyStage.slice(1)} - ${storyType.charAt(0).toUpperCase() + storyType.slice(1)}`}
        />
      </div>
      <StoryTextContent
        parsedContent={parsedContent}
        storyPremise={storyPremise}
        storyDraft={storyDraft}
        dateCreated={storyDate}
        storyID={params.text}
        storyNote={storyNote}
      />
    </div>
  );
}
