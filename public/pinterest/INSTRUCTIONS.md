# How to Add Your Pinterest Images to SoJourn

This guide will help you add the 6 Pinterest travel images to your SoJourn website.

## Image Requirements

- Each image should be saved in square format (1:1 aspect ratio) for optimal display
- Recommended resolution: 800x800 pixels or higher
- File format: JPG or JPEG
- Maximum file size: 2MB per image

## Image Placement

The images you've provided should be renamed and placed in this directory as follows:

1. First image (mountain valley at sunset): `mountain-valley.jpg`
2. Second image (person in field with mountains): `mountain-meadow.jpg`
3. Third image (person at campfire): `campfire-mountains.jpg`
4. Fourth image (lake with backpack): `lake-backpack.jpg`
5. Fifth image (Brooklyn Bridge/NYC): `city-skyline.jpg`
6. Sixth image (tree-lined road): `forest-road.jpg`

## Steps to Add Images

1. Save the Pinterest images to your computer
2. Rename each image following the convention above
3. Replace the placeholder files in this directory with your images
4. Make sure the files are correctly named
5. Restart your development server with `npm run dev`

## Customizing Location Information

If you want to customize the location information that appears on hover:

1. Open the file: `/src/components/PinterestInspiration.tsx`
2. Find the `pinterestImages` array near the top of the file
3. Edit the `location` property for each image to match your desired location

For example:
```typescript
{
  path: "/pinterest/mountain-valley.jpg",
  alt: "Scenic mountain valley at sunset",
  location: "Glacier National Park, Montana" // Change this to your desired location
}
```

## Testing Your Changes

After adding your images, run `npm run dev` and visit the Travel Inspiration section of your site to see your images in the Pinterest gallery. 