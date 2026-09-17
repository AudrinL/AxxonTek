# Photos — shot list

Real photographs are the single biggest upgrade this site can get. Phone photos are fine;
what matters is real people, real place, natural light.

Drop originals in this folder, then run:

```bash
npm run photos
```

That resizes and converts each one to a web-sized `.webp` next to the original (max 1800px on the
long edge, ~80% quality). Then point the slot at the `.webp` in [`lib/site.ts`](../../../lib/site.ts):

```ts
export const photos = {
  hero: "/assets/photos/hero.webp",
  team: "/assets/photos/team.webp",
  workspace: "/assets/photos/workspace.webp",
};
// and per service:
{ slug: "smart-homes", photo: "/assets/photos/smart-homes.webp", ... }
```

Every slot is optional. An empty slot falls back to the photo-less layout, so you can add them one at a
time.

## The shots

| Slot | Where it appears | Crop | What to shoot |
| --- | --- | --- | --- |
| `hero` | Homepage hero, right side | **4:5 portrait** | One engineer at their desk at Norrsken. Looking at the camera or mid-conversation with someone off-frame. Laptop open, window light. This is the face of the company — pick the person you'd want on the first call. |
| `team` | Homepage "Why AxxonTek" + About | **16:9 landscape** | All four of you around a whiteboard or a table, actually working — not posed in a row. Someone drawing, someone pointing. Warm daylight. |
| `workspace` | About page | **3:2** | Norrsken Kigali — the building, the workspace floor, or the view. Establishes that the address is real. |
| `software` | Services card + page | 3:2 | An engineer building an app or site — laptop with a real screen, or a phone in hand testing it. |
| `consulting` | Services card + page | 3:2 | Two people across a table with a notebook or a diagram — a real advisory conversation. |
| `lab` | Services card + page | 3:2 | Whiteboard, sticky notes, a prototype on a screen — the lab actually working on something. |
| `smart-homes` | Services card + page | 3:2 | An actual install: a camera going onto a wall, a smart lock or panel, a technician on a ladder. |

## Tips that make phone photos look professional

- **Light:** shoot near a window, in the morning or late afternoon. Never under fluorescent tubes only.
- **Don't pose:** ask people to keep working and shoot 20 frames; pick the one where nobody is looking
  at the camera (except the hero portrait).
- **Orange:** if anything orange is around — a notebook, a chair, a lanyard — get it in frame. It ties
  the photos to the brand.
- **Clean the desk** behind the subject; a water bottle and a laptop is enough.
- **Leave room for the crop.** Shoot a little wider than the crop above; the site crops with
  `object-cover`, so the subject should sit in the middle of the frame.
- **No text or logos** that will date the photo or need permission.
