import { esc } from "../utils/helpers.js";

function imageUrl(question, game) {
  return new URL(question.image, question.assetBase).href;
}

function fullImage(question, game, className = "image-identification-full") {
  return `<img class="${className}" src="${esc(imageUrl(question, game))}" alt="">`;
}

function partialImage(question, game) {
  const { x, y, width, height } = question.crop;
  const scaleX = 100 / width;
  const scaleY = 100 / height;
  return `<div class="image-identification-crop" style="--crop-ratio:${width / height}">
    <img src="${esc(imageUrl(question, game))}" alt="" style="width:${scaleX}%;height:${scaleY}%;left:${-(x / width) * 100}%;top:${-(y / height) * 100}%">
  </div>`;
}

export function renderImageIdentificationQuestion(question, game) {
  const isPartial = question.variant === "partial";
  const media = game.revealed
    ? fullImage(question, game, "image-identification-revealed")
    : (isPartial ? partialImage(question, game) : fullImage(question, game));

  const prompt = question.question || (isPartial ? "Identify the full image" : "Identify this image");
  const answer = game.revealed
    ? `<div class="regular-answer-area image-identification-answer">
         <div class="muted">ANSWER</div>
         <div class="regular-answer">${esc(question.answer || "")}</div>
       </div>`
    : "";

  return `<div class="question-type-layout image-identification-layout">
    <div class="question">${esc(prompt)}</div>
    <div class="image-identification-media">${media}</div>
    ${answer}
  </div>`;
}
