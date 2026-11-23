const PASSCODE = "0612";
const enteredDigits = [];
const slots = [...document.querySelectorAll(".passcode-dot")];
const feedback = document.querySelector("#feedback");
const keypad = document.querySelector(".keypad");
const enterButton = document.querySelector("#enter-button");
const screens = [...document.querySelectorAll(".screen")];
const quoteOutput = document.querySelector("#friend-quote");
const photoViewer = document.querySelector("#photo-lightbox");
const photoViewerImage = document.querySelector("#photo-lightbox-image");
const photoViewerCaption = document.querySelector("#photo-lightbox-caption");
const musicToggle = document.querySelector("#music-toggle");
const musicLabel = document.querySelector("#music-label");
const musicStatus = document.querySelector("#music-status");
const birthdayMusic = document.querySelector("#birthday-music");
const bookTitle = document.querySelector("#book-title");
const photoAlbumChoice = document.querySelector("#photo-album-choice");
const notebookChoice = document.querySelector("#notebook-choice");
const bestFriendQuoteSubjects = [
  "A best friend like you",
  "Our friendship",
  "The friendship we share",
  "Having you as my best friend",
  "This beautiful friendship",
  "Being your best friend",
  "A friend like you",
  "My best friend",
  "The bond between best friends",
  "A friendship as special as ours"
];
const bestFriendQuoteActions = [
  "makes ordinary days brighter",
  "turns small moments into memories I treasure",
  "reminds me I never have to face life alone",
  "makes hard days feel a little lighter",
  "gives me a safe place to be myself",
  "brings more laughter into my life",
  "shows me what a caring friendship looks like",
  "is one of the happiest parts of my life",
  "makes every new adventure more fun",
  "helps me feel understood and accepted",
  "gives my heart a reason to be grateful",
  "makes life feel kinder and more hopeful"
];
const bestFriendQuoteEndings = [
  "and I feel lucky to call you my best friend.",
  "and I'll always be grateful our paths crossed.",
  "and you will always have a special place in my heart.",
  "because a true best friend like you is one of a kind.",
  "and I'll keep cheering you on through every chapter.",
  "and I hope you always remember how deeply you're appreciated.",
  "and I choose this friendship, today and every day.",
  "because life is sweeter with you by my side."
];
let availableBestFriendQuotes = [];
let lastBestFriendQuote = "";
const photoAssets = [
  ...Array.from({ length: 16 }, (_, index) => `assets/mammu%20${index + 2}.jpeg`),
  "assets/mammu%2018%20.jpeg",
  "assets/mammu%2019%20.jpeg",
  "assets/mammu%2020.jpeg",
  ...[3, 4, 6, 7, 9, 10, 11, 12].map((number) => `assets/m%20${number}.jpeg`),
  "assets/group%202.jpeg"
];
const photoMemories = [
  { caption: "a day to celebrate", quote: "The happiest days are the ones we get to celebrate side by side." },
  { caption: "colorful moments", quote: "Every time I see this, I remember how beautiful it is to have you beside me." },
  { caption: "our kind of day", quote: "Even an ordinary place feels special when we are making memories together." },
  { caption: "silly selfies", quote: "A little laughter, a silly selfie, and my favorite person — that is happiness." },
  { caption: "close to my heart", quote: "Some memories feel like a warm hug every time I look back." },
  { caption: "birthday smiles", quote: "The cake was sweet, but sharing that moment with you was sweeter." },
  { caption: "always together", quote: "Wherever we go, being together is what makes the moment matter." },
  { caption: "one to keep", quote: "This picture reminds me how lucky I am to have you in my life." }
];
const floatingPhotoAssets = photoAssets.slice(0, 8).map((src, index) => ({
  src,
  alt: `A favorite photo memory ${index + 1}`,
  ...photoMemories[index]
}));
const albumPhotos = photoAssets.map((src, index) => ({
  src,
  alt: `A favorite photo memory ${index + 1}`
}));
const albumChapters = [
  { text: "Every laugh, every long talk, every silly moment — they all mean the world to me." },
  { text: "The best memories are even better because I get to share them with you." },
  { text: "I hope this year brings you all the joy and kindness you give to everyone around you." },
  { text: "No matter where life takes us, you will always have a friend cheering you on." },
  { text: "Here is to all the places we have been and all the happy adventures still to come." },
  { text: "Thank you for making even ordinary days feel bright, funny, and full of heart." },
  { text: "Today we celebrate you — your kind heart, your bright smile, and everything you are." },
  { text: "The smallest moments often become the stories we love telling the most." },
  { text: "I am so lucky to have you in my life. Here is to making many more memories together." },
  { text: "Happy birthday! This album may end, but our friendship and the good times keep going." }
];
const notebookNotes = [
  { title: "You mean so much", text: "I don't think you truly realize how much space you've taken up in my heart. You are not just someone special to me; you have become a part of my everyday thoughts, my happiness, my peace, and one of the most beautiful parts of my life. ❤️" },
  { title: "The day we met", text: "From the moment we became friends until today, you've slowly become someone I never want to lose. I still feel grateful for the day our paths crossed because meeting you was one of the best things life has ever given me." },
  { title: "A beautiful bond", text: "I never knew that a person could become this important to me, that a simple friendship could turn into such a beautiful bond, and that someone could mean so much without even realizing it." },
  { title: "The first person I tell", text: "You are the first person I want to tell when something beautiful happens, the person I turn to when life feels confusing, and the one I find myself missing even five minutes after we've finished talking." },
  { title: "Always myself with you", text: "You are someone with whom I can laugh without a reason, talk about absolutely anything, share my stupid thoughts, be completely myself, and never feel judged." },
  { title: "Thank you for being there", text: "Thank you for being my biggest supporter, for standing beside me, for understanding me even when I struggle to explain myself, and for making me feel that I am never alone." },
  { title: "Thank you for choosing me", text: "Thank you for choosing me as your best friend, for accepting my flaws, tolerating my mood swings, listening to my endless talks, and staying even during the moments when I am not the easiest person to handle." },
  { title: "My peace and my butterflies", text: "There is something about you that makes me feel calm and excited at the same time, safe yet full of butterflies, and happy in ways I never knew were possible." },
  { title: "Little moments, forever", text: "You have become someone whose presence makes my ordinary days feel extraordinary. Even the smallest conversations with you become memories that I want to keep forever." },
  { title: "Irreplaceable", text: "I want you to know that you are irreplaceable in my life. Nobody can take your place, and nobody ever needs to." },
  { title: "Your place is yours", text: "No matter how many people I meet, how many friendships I make, or how many new chapters life brings, the place you hold in my heart will always remain yours." },
  { title: "I would still choose you", text: "And if life gave me a thousand choices, a million different paths, and the chance to meet countless people, I would still choose you." },
  { title: "Every single time", text: "Every single time. In every situation, through every season of life, and on every difficult day." },
  { title: "Beside you through it all", text: "Because for me, it's not just about having you as my best friend; it's about wanting you beside me through everything life brings our way. It's about choosing you not just when everything is beautiful, but also when things get difficult." },
  { title: "Bigger than a disagreement", text: "I don't expect our friendship to be perfect every day. We may argue, misunderstand each other, get upset, or sometimes fail to understand what the other person is feeling. But I never want our egos, temporary anger, or little misunderstandings to become bigger than the beautiful friendship we share." },
  { title: "A promise to you", text: "I promise that no matter how life changes, I will always value this bond. I want us to celebrate each other's happiness, support each other through difficult times, laugh over the silliest things, create countless memories, and continue being part of each other's lives." },
  { title: "Cheering you on", text: "I want to see you achieve everything you've ever dreamed of, and I hope I get to be there cheering for you through every little and big achievement." },
  { title: "Your sparkle", text: "You have been a beautiful sparkle in my life, someone who makes even my darkest days feel a little brighter. I may not express it perfectly every day, but I hope you never doubt how much you mean to me. Sometimes words are simply not enough to explain how thankful I am to have you." },
  { title: "In every lifetime", text: "If I had to choose all over again, in every lifetime, in every version of my story, and in every possible universe, my heart would still find its way to you. Because some people are not just meant to cross our paths; they are meant to become a beautiful part of our story. And you will always be that person for me." },
  { title: "Never become strangers", text: "I don't know what the future holds for us, where life will take us, or how many things will change along the way. But one thing I genuinely wish for is that we never become strangers." },
  { title: "Keep our memories close", text: "I want us to look back years from now and smile at all the memories we've made, remembering how this beautiful friendship started and how we managed to keep it alive through everything." },
  { title: "You are so loved", text: "Always remember that you are special, you are loved, you are appreciated, and you will always have a special place in my heart. Never think that you are just another person in my life, because you are so much more than that." },
  { title: "My favourite human", text: "Once again, thank you for being YOU, for being my happiness, my comfort person, my favourite human, and above all, MY BEST FRIEND. I am genuinely lucky to have you, and if I could ask life for one thing, it would be to keep this beautiful friendship with me forever." },
  { title: "Birthday wishes, always", text: "No matter how many birthdays come and go, no matter how much life changes, I will always wish to celebrate you, support you, annoy you, laugh with you, and make beautiful memories with you." },
  { title: "Today, tomorrow, forever", text: "HAPPY BIRTHDAY ONCE AGAIN, MY BEST FRIEND, MY FAVOURITE PERSON, AND MY FOREVER FRIEND. ❤️🫂" },
  { title: "I choose you", text: "I CHOOSE YOU AS MY BEST FRIEND, TODAY, TOMORROW, AND IN EVERY LIFETIME. ♾️❤️" }
];

let screenTimer = null;
let ageTimer = null;
let currentBookPage = 0;
let currentBook = "album";
let musicPlaying = false;
let isPageTurning = false;

function getBestFriendQuote() {
  if (availableBestFriendQuotes.length === 0) {
    availableBestFriendQuotes = bestFriendQuoteSubjects.flatMap((subject) =>
      bestFriendQuoteActions.flatMap((action) =>
        bestFriendQuoteEndings.map((ending) => `${subject} ${action}, ${ending}`)
      )
    );

    for (let index = availableBestFriendQuotes.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [availableBestFriendQuotes[index], availableBestFriendQuotes[randomIndex]] =
        [availableBestFriendQuotes[randomIndex], availableBestFriendQuotes[index]];
    }

    if (availableBestFriendQuotes[availableBestFriendQuotes.length - 1] === lastBestFriendQuote) {
      [availableBestFriendQuotes[0], availableBestFriendQuotes[availableBestFriendQuotes.length - 1]] =
        [availableBestFriendQuotes[availableBestFriendQuotes.length - 1], availableBestFriendQuotes[0]];
    }
  }

  lastBestFriendQuote = availableBestFriendQuotes.pop();
  return lastBestFriendQuote;
}

function stopTimers() {
  window.clearTimeout(screenTimer);
  window.clearTimeout(ageTimer);
}

function showScreen(screenId) {
  stopTimers();
  screens.forEach((screen) => {
    screen.hidden = screen.id !== screenId;
  });
  musicToggle.classList.toggle("is-garden", screenId === "screen-gift-garden");

  const activeScreen = document.querySelector(`#${screenId}`);
  const heading = activeScreen.querySelector("[tabindex='-1']");
  if (heading) heading.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDigits() {
  slots.forEach((slot, index) => {
    slot.classList.toggle("is-filled", index < enteredDigits.length);
  });
}

function setFeedback(message, state = "") {
  feedback.textContent = message;
  feedback.className = `feedback${state ? ` is-${state}` : ""}`;
}

function addDigit(digit) {
  if (enteredDigits.length === 4) return;

  pauseBirthdayMusic();
  enteredDigits.push(digit);
  renderDigits();
  setFeedback("");
}

function clearDigits() {
  pauseBirthdayMusic();
  enteredDigits.length = 0;
  renderDigits();
  setFeedback("");
}

function submitPasscode() {
  pauseBirthdayMusic();
  if (enteredDigits.length !== 4) {
    setFeedback("Please enter all 4 digits.", "error");
    return;
  }

  if (enteredDigits.join("") === PASSCODE) {
    showScreen("screen-surprise");
    void playBirthdayMusic();
    return;
  }

  clearDigits();
  setFeedback("Not quite — try again!", "error");
}

function startBirthdayPage() {
  showScreen("screen-birthday");
  screenTimer = window.setTimeout(() => showScreen("screen-candles"), 10_000);
}

function blowOutCandles() {
  const candleScreen = document.querySelector("#screen-candles");
  if (candleScreen.classList.contains("candles-out")) return;

  candleScreen.classList.add("candles-out");
  candleScreen.querySelectorAll(".candle").forEach((candle) => {
    candle.classList.add("is-out");
  });
  document.querySelector("#candle-feedback").textContent = "Wish sent! ✨";
  screenTimer = window.setTimeout(startAgeCelebration, 1_200);
}

function startAgeCelebration() {
  showScreen("screen-age");
  const oldAge = document.querySelector("#old-age");
  const newAge = document.querySelector("#new-age");
  const ageMessage = document.querySelector("#age-message");
  const continueButton = document.querySelector("#age-continue");

  oldAge.hidden = false;
  newAge.hidden = true;
  oldAge.classList.remove("is-burning");
  continueButton.hidden = true;
  ageMessage.textContent = "Let the old year go with a little sparkle...";

  screenTimer = window.setTimeout(() => {
    oldAge.classList.add("is-burning");
  }, 500);

  ageTimer = window.setTimeout(() => {
    oldAge.hidden = true;
    newAge.hidden = false;
    ageMessage.textContent = "Hello, 21! Your brightest year starts now.";
    continueButton.hidden = false;
  }, 2_500);
}

function renderBookPage() {
  const pages = [...document.querySelectorAll("[data-book-page]")];
  pages.forEach((page, index) => {
    page.hidden = index !== currentBookPage;
    page.classList.remove("is-turning-forward", "is-turning-backward");
  });

  document.querySelector("#book-page-count").textContent = `${currentBookPage + 1} / ${pages.length}`;
  document.querySelector("#previous-page").disabled = currentBookPage === 0;
  document.querySelector("#next-page").disabled = currentBookPage === pages.length - 1;
}

function createBookPage(entry, index) {
  const page = document.createElement("article");
  page.className = "book-page";
  page.dataset.bookPage = String(index);
  page.hidden = index !== currentBookPage;

  const copy = document.createElement("div");
  copy.className = "book-page-copy";
  const description = document.createElement("p");
  description.textContent = entry.text;
  copy.append(description);
  page.append(copy);

  for (let photoIndex = 0; photoIndex < 2; photoIndex += 1) {
    const photo = albumPhotos[(index * 2 + photoIndex) % albumPhotos.length];
    const figure = document.createElement("figure");
    figure.className = `book-photo book-photo-${photoIndex === 0 ? "one" : "two"}`;
    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt;
    image.draggable = false;
    const caption = document.createElement("figcaption");
    caption.textContent = photoIndex === 0 ? "a favorite memory" : "one to keep";
    figure.append(image, caption);
    page.append(figure);
  }

  return page;
}

function renderBookAlbum() {
  isPageTurning = false;
  const album = document.querySelector("#memory-album");
  album.replaceChildren(...albumChapters.map(createBookPage));
  album.classList.remove("is-notebook");
  album.setAttribute("aria-label", "Spiral-bound photo album");
  bookTitle.textContent = "Our spiral photo album";
  currentBook = "album";
  photoAlbumChoice.classList.add("is-selected");
  photoAlbumChoice.setAttribute("aria-pressed", "true");
  notebookChoice.classList.remove("is-selected");
  notebookChoice.setAttribute("aria-pressed", "false");
  currentBookPage = 0;
  renderBookPage();
}

function renderNotebook() {
  isPageTurning = false;
  const album = document.querySelector("#memory-album");
  const pages = notebookNotes.map((note, index) => {
    const page = document.createElement("article");
    page.className = "book-page notebook-page";
    page.dataset.bookPage = String(index);
    page.hidden = index !== currentBookPage;
    page.tabIndex = 0;
    page.setAttribute("aria-label", `Notebook page ${index + 1} of ${notebookNotes.length}. Click to turn the page.`);

    const copy = document.createElement("div");
    copy.className = "book-page-copy";
    const title = document.createElement("h2");
    title.textContent = note.title;
    const description = document.createElement("p");
    description.textContent = note.text;
    copy.append(title, description);
    page.append(copy);
    return page;
  });
  album.replaceChildren(...pages);
  album.classList.add("is-notebook");
  album.setAttribute("aria-label", "Birthday notebook");
  bookTitle.textContent = "Little notes for you";
  currentBook = "notebook";
  photoAlbumChoice.classList.remove("is-selected");
  photoAlbumChoice.setAttribute("aria-pressed", "false");
  notebookChoice.classList.add("is-selected");
  notebookChoice.setAttribute("aria-pressed", "true");
  currentBookPage = 0;
  renderBookPage();
}

function changeBookPage(direction) {
  if (isPageTurning) return;

  const pages = [...document.querySelectorAll("[data-book-page]")];
  const nextPage = Math.max(0, Math.min(pages.length - 1, currentBookPage + direction));
  if (nextPage === currentBookPage) return;

  const activePage = pages[currentBookPage];
  if (currentBook === "notebook") {
    isPageTurning = true;
    activePage.classList.add(direction > 0 ? "is-turning-forward" : "is-turning-backward");
    activePage.addEventListener("animationend", () => {
      currentBookPage = nextPage;
      isPageTurning = false;
      renderBookPage();
    }, { once: true });
    return;
  }

  currentBookPage = nextPage;
  renderBookPage();
}

function moveFloatingPhoto(photo, wall, left, top) {
  const maxLeft = Math.max(0, wall.clientWidth - photo.offsetWidth);
  const maxTop = Math.max(0, wall.clientHeight - photo.offsetHeight);
  photo.style.left = `${Math.max(0, Math.min(left, maxLeft))}px`;
  photo.style.top = `${Math.max(0, Math.min(top, maxTop))}px`;
  photo.style.right = "auto";
  photo.style.bottom = "auto";
}

function enableFloatingPhotoDragging(photo, wall) {
  let isDragging = false;
  let movedDuringDrag = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerOffsetX = 0;
  let pointerOffsetY = 0;

  photo.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;

    photo.classList.add("is-dragging");
    const photoBounds = photo.getBoundingClientRect();
    const wallBounds = wall.getBoundingClientRect();
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerOffsetX = event.clientX - photoBounds.left;
    pointerOffsetY = event.clientY - photoBounds.top;
    photo.style.left = `${photoBounds.left - wallBounds.left}px`;
    photo.style.top = `${photoBounds.top - wallBounds.top}px`;
    photo.style.right = "auto";
    photo.style.bottom = "auto";
    isDragging = true;
    photo.setPointerCapture(event.pointerId);
  });

  photo.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    if (Math.abs(event.clientX - pointerStartX) > 4 || Math.abs(event.clientY - pointerStartY) > 4) {
      movedDuringDrag = true;
    }

    const wallBounds = wall.getBoundingClientRect();
    moveFloatingPhoto(
      photo,
      wall,
      event.clientX - wallBounds.left - pointerOffsetX,
      event.clientY - wallBounds.top - pointerOffsetY
    );
  });

  const finishDragging = (event) => {
    if (!isDragging) return;

    isDragging = false;
    photo.classList.remove("is-dragging");
    if (movedDuringDrag) {
      photo.dataset.dragged = "true";
      window.setTimeout(() => delete photo.dataset.dragged, 150);
    }
    movedDuringDrag = false;
    if (photo.hasPointerCapture(event.pointerId)) {
      photo.releasePointerCapture(event.pointerId);
    }
  };

  photo.addEventListener("pointerup", finishDragging);
  photo.addEventListener("pointercancel", finishDragging);
  photo.addEventListener("keydown", (event) => {
    const movement = 12;
    const directions = {
      ArrowUp: [0, -movement],
      ArrowDown: [0, movement],
      ArrowLeft: [-movement, 0],
      ArrowRight: [movement, 0]
    };
    const direction = directions[event.key];
    if (!direction) return;

    event.preventDefault();
    const photoBounds = photo.getBoundingClientRect();
    const wallBounds = wall.getBoundingClientRect();
    const left = photo.style.left ? Number.parseFloat(photo.style.left) : photoBounds.left - wallBounds.left;
    const top = photo.style.top ? Number.parseFloat(photo.style.top) : photoBounds.top - wallBounds.top;
    moveFloatingPhoto(photo, wall, left + direction[0], top + direction[1]);
  });
}

function renderFloatingPhotos(paper) {
  const photoWall = document.createElement("div");
  photoWall.className = "floating-memories";
  photoWall.setAttribute("role", "group");
  photoWall.setAttribute("aria-label", "Move the floating photos with your mouse or arrow keys");

  photoWall.replaceChildren(...floatingPhotoAssets.map((photo, index) => {
    const frame = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");
    frame.className = `floating-photo floating-photo-${index}`;
    frame.tabIndex = 0;
    frame.setAttribute("aria-label", `Move photo: ${photo.caption}`);
    image.src = photo.src;
    image.alt = photo.alt;
    image.draggable = false;
    caption.textContent = photo.caption;
    frame.append(image, caption);
    frame.addEventListener("click", () => {
      if (frame.dataset.dragged !== "true") quoteOutput.textContent = photo.quote;
    });
    frame.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") quoteOutput.textContent = photo.quote;
    });
    enableFloatingPhotoDragging(frame, photoWall);
    return frame;
  }));
  paper.prepend(photoWall);
}

function openPhotoViewer(image) {
  const figure = image.closest("figure");
  const caption = figure && figure.querySelector("figcaption");
  photoViewerImage.src = image.currentSrc || image.src;
  photoViewerImage.alt = image.alt;
  photoViewerCaption.textContent = caption ? caption.textContent : image.alt;
  photoViewer.showModal();
}

function enablePhotoViewing() {
  document.querySelectorAll(".paper img").forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `View larger image: ${image.alt}`);
    image.draggable = false;
    const floatingPhoto = image.closest(".floating-photo");
    const clickTarget = floatingPhoto || image;
    clickTarget.addEventListener("click", () => {
      if (floatingPhoto && floatingPhoto.dataset.dragged === "true") {
        delete floatingPhoto.dataset.dragged;
        return;
      }

      openPhotoViewer(image);
    });
    image.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      openPhotoViewer(image);
    });
  });
}

function updateMusicControl() {
  musicToggle.setAttribute("aria-pressed", String(musicPlaying));
  musicToggle.setAttribute("aria-label", musicPlaying ? "Pause birthday music" : "Play birthday music");
  musicLabel.textContent = musicPlaying ? "Pause music" : "Play music";
}

function pauseBirthdayMusic() {
  if (!birthdayMusic.paused) birthdayMusic.pause();
  musicPlaying = false;
  updateMusicControl();
}

async function playBirthdayMusic() {
  try {
    birthdayMusic.muted = false;
    birthdayMusic.volume = 1;
    await birthdayMusic.play();
    musicPlaying = true;
    updateMusicControl();
    musicStatus.textContent = "Birthday music playing.";
  } catch (error) {
    musicPlaying = false;
    updateMusicControl();
    musicStatus.textContent = `Music could not start: ${error.message}`;
  }
}

function toggleBirthdayMusic() {
  if (musicPlaying) {
    pauseBirthdayMusic();
    musicStatus.textContent = "Birthday music paused.";
    return;
  }

  playBirthdayMusic();
}

renderBookAlbum();
renderFloatingPhotos(document.querySelector("#screen-gift-garden .paper"));
enablePhotoViewing();

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.digit !== undefined) {
    addDigit(button.dataset.digit);
  } else if (button.dataset.action === "clear") {
    clearDigits();
  } else if (button.dataset.action === "backspace") {
    pauseBirthdayMusic();
    enteredDigits.pop();
    renderDigits();
    setFeedback("");
  }
});

enterButton.addEventListener("click", submitPasscode);

document.addEventListener("keydown", (event) => {
  if (photoViewer.open || document.querySelector("#screen-passcode").hidden) return;

  if (/^\d$/.test(event.key)) {
    addDigit(event.key);
  } else if (event.key === "Backspace") {
    pauseBirthdayMusic();
    enteredDigits.pop();
    renderDigits();
    setFeedback("");
  } else if (event.key === "Escape" || event.key === "Delete") {
    clearDigits();
  } else if (event.key === "Enter") {
    submitPasscode();
  }
});

document.querySelector("#surprise-yes").addEventListener("click", startBirthdayPage);
document.querySelector("#surprise-no").addEventListener("click", () => showScreen("screen-no-surprise"));
document.querySelector("#try-again").addEventListener("click", () => showScreen("screen-surprise"));
document.querySelector("#skip-to-candles").addEventListener("click", () => showScreen("screen-candles"));
document.querySelectorAll(".candle").forEach((candle) => candle.addEventListener("click", blowOutCandles));
document.querySelector("#blow-button").addEventListener("click", blowOutCandles);
document.querySelector("#age-continue").addEventListener("click", () => showScreen("screen-gift-question"));
document.querySelector("#gifts-yes").addEventListener("click", () => showScreen("screen-gift-menu"));
document.querySelector("#gifts-no").addEventListener("click", () => showScreen("screen-no-gifts"));
document.querySelector("#okay-button").addEventListener("click", () => showScreen("screen-gift-question"));

document.querySelectorAll("[data-gift]").forEach((button) => {
  button.addEventListener("click", () => {
    const giftScreens = {
      letter: "screen-gift-letter",
      garden: "screen-gift-garden",
      book: "screen-gift-book"
    };
    showScreen(giftScreens[button.dataset.gift]);
  });
});

document.querySelectorAll(".back-to-gifts").forEach((button) => {
  button.addEventListener("click", () => showScreen("screen-gift-menu"));
});

document.querySelectorAll(".butterfly").forEach((butterfly) => {
  butterfly.addEventListener("click", () => {
    quoteOutput.textContent = getBestFriendQuote();
  });
});

document.querySelector("#photo-lightbox-close").addEventListener("click", () => photoViewer.close());
photoViewer.addEventListener("click", (event) => {
  if (event.target === photoViewer) photoViewer.close();
});
photoViewer.addEventListener("close", () => {
  photoViewerImage.removeAttribute("src");
  photoViewerCaption.textContent = "";
});
musicToggle.addEventListener("click", toggleBirthdayMusic);
birthdayMusic.addEventListener("pause", () => {
  musicPlaying = false;
  updateMusicControl();
});
birthdayMusic.addEventListener("play", () => {
  musicPlaying = true;
  updateMusicControl();
});
photoAlbumChoice.addEventListener("click", renderBookAlbum);
notebookChoice.addEventListener("click", renderNotebook);

document.querySelector("#previous-page").addEventListener("click", () => changeBookPage(-1));
document.querySelector("#next-page").addEventListener("click", () => changeBookPage(1));
document.querySelector("#memory-album").addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  changeBookPage(1);
});
document.querySelector("#memory-album").addEventListener("keydown", (event) => {
  if (currentBook !== "notebook" || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault();
  changeBookPage(1);
});
