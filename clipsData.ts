interface ClipMeta {
  cut: string,
  tags: Array<string>,
  mute: boolean
  location: string
  contrast: Contrast
}

interface VideoMeta {
  videos: Array<ClipMeta>
}

export const clipsData: VideoMeta = {
  videos: [
    {
      cut: "00:00:03-00:00:09",
      tags: ["nature", "beauty", "valley", "river"],
      mute: true,
      location: "Valley of Flowers - Uttarakhand, India",
      contrast: "high"
    },
  ],
}
