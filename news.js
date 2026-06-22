const VALID_CATEGORIES = new Set(["ai", "space", "neuroscience"]);
const expandedCategories = new Set();

export function sortStories(stories) {
  return [...stories].sort(
    (left, right) =>
      Date.parse(right.publishedAt) - Date.parse(left.publishedAt) || left.id.localeCompare(right.id)
  );
}

export function groupStoriesByDate(stories) {
  const groups = new Map();
  for (const story of sortStories(stories)) {
    const date = story.dateET;
    if (!groups.has(date)) groups.set(date, []);
    groups.get(date).push(story);
  }
  return [...groups].map(([date, groupedStories]) => ({ date, stories: groupedStories }));
}

export function visibleStories(stories, expanded, limit = 10) {
  const sorted = sortStories(stories);
  return expanded ? sorted : sorted.slice(0, limit);
}

export function setCategoryExpanded(category, expanded) {
  if (!VALID_CATEGORIES.has(category)) throw new Error(`Unknown news category: ${category}`);
  if (expanded) expandedCategories.add(category);
  else expandedCategories.delete(category);
}

export function isCategoryExpanded(category) {
  return expandedCategories.has(category);
}

function formatDate(dateET) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateET}T12:00:00Z`));
}

function formatTime(isoDate) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(isoDate));
}

function createStoryElement(story) {
  const link = document.createElement("a");
  const meta = document.createElement("span");
  const source = document.createElement("span");
  const time = document.createElement("time");
  const title = document.createElement("strong");
  const translation = document.createElement("span");

  link.className = "news-story";
  link.href = story.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  meta.className = "news-story-meta";
  source.textContent = story.source;
  time.dateTime = story.publishedAt;
  time.textContent = formatTime(story.publishedAt);
  title.textContent = story.title;
  translation.className = "news-translation";
  translation.textContent = story.titleZh || `${story.title}（翻译待更新）`;

  meta.append(source, time);
  link.append(meta, title, translation);
  return link;
}

function renderCategory(category, stories) {
  const channel = document.querySelector(`[data-category="${category}"]`);
  if (!channel) return;

  const list = channel.querySelector("[data-story-list]");
  const count = channel.querySelector("[data-story-count]");
  const button = channel.querySelector("[data-view-all]");
  const expanded = isCategoryExpanded(category);
  const selectedStories = visibleStories(stories, expanded);

  list.replaceChildren();
  for (const group of groupStoriesByDate(selectedStories)) {
    const date = document.createElement("h3");
    date.className = "news-date";
    date.textContent = formatDate(group.date);
    list.append(date, ...group.stories.map(createStoryElement));
  }

  count.textContent = `${stories.length} ${stories.length === 1 ? "STORY" : "STORIES"}`;
  button.hidden = stories.length <= 10;
  button.textContent = expanded ? "Show less" : "View all";
  button.onclick = () => {
    setCategoryExpanded(category, !expanded);
    renderCategory(category, stories);
  };
}

export function renderArchive(archive) {
  const stories = Array.isArray(archive.stories) ? archive.stories : [];
  for (const category of VALID_CATEGORIES) {
    renderCategory(category, stories.filter((story) => story.category === category));
  }

  const updatedAt = document.querySelector("#news-updated-at");
  updatedAt.textContent = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(archive.updatedAt));
}

async function loadArchive() {
  const unavailable = document.querySelector("#news-unavailable");
  try {
    const response = await fetch("data/news-data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`News request failed: ${response.status}`);
    renderArchive(await response.json());
  } catch (error) {
    unavailable.hidden = false;
    console.error(error);
  }
}

if (typeof document !== "undefined") loadArchive();
