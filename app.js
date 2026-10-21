const videos = {
  legPress: { id: '3R0SOJ3alTA', title: 'Leg Press', by: 'Bodybuilding.com' },
  chestPress: { id: 'nptHSfrdPIQ', title: 'Machine Chest Press', by: 'FITTR' },
  latPulldown: { id: 'lueEJGjTuPQ', title: 'Wide-Grip Lat Pulldown', by: 'Bodybuilding.com' },
  legCurl: { id: 'EqCsK_vlnfE', title: 'Seated Leg Curl Machine', by: 'Morgan, M.S., CPT' },
  gluteBridge: { id: 'iwHvjHh59f8', title: 'Glute Bridge', by: 'WeShape' },
  deadBug: { id: 'GbSC02oU3To', title: 'Dead Bug', by: 'Physical Therapists' },
  gobletSquat: { id: '9KzZD_n2r64', title: 'Goblet Squat', by: 'Naomi Kong' },
  cableRow: { id: 'xQNrFHEMhI4', title: 'Seated Cable Row', by: 'Bodybuilding.com' },
  shoulderPress: { id: '3R14MnZbcpw', title: 'Machine Shoulder Press', by: 'Colossus Fitness' },
  dumbbellRdl: { id: 'hQgFixeXdZo', title: 'Dumbbell Romanian Deadlift', by: 'Technique for Beginners' },
  hipAbduction: { id: 'HngwgIoABFg', title: 'Hip Abduction Machine', by: 'Gerardi Performance' },
  pallofPress: { id: 'axgv7H_VQOo', title: 'Pallof Press', by: 'BarBend' }
};

const strengthA = [
  { id: 'legPress', name: 'Leg press', dose: '2 × 8–12', tip: 'Set the seat so the knees bend comfortably. Keep feet flat; do not lock the knees.', swap: 'Swap: sit-to-stand from a bench' },
  { id: 'chestPress', name: 'Chest press machine', dose: '2 × 8–12', tip: 'Set handles around chest height. Press smoothly; keep shoulders relaxed.', swap: 'Swap: light dumbbell floor press' },
  { id: 'latPulldown', name: 'Lat pulldown', dose: '2 × 8–12', tip: 'Pull the bar toward the upper chest. Keep the torso tall; skip behind-the-neck pulls.', swap: 'Swap: ask staff for a pulldown handle setup' },
  { id: 'legCurl', name: 'Seated leg curl', dose: '2 × 10–12', tip: 'Line the knee joint up with the machine pivot. Curl and return with control.', swap: 'Swap: light glute bridge' },
  { id: 'gluteBridge', name: 'Glute bridge', dose: '2 × 12', tip: 'Push through the whole foot and gently squeeze at the top. Keep ribs relaxed.', swap: 'Mat exercise' },
  { id: 'deadBug', name: 'Dead bug', dose: '2 × 8 / side', tip: 'Move slowly. Make the reach smaller if the lower back lifts off the mat.', swap: 'Mat exercise' }
];

const strengthB = [
  { id: 'gobletSquat', name: 'Goblet squat to bench', dose: '2 × 8–10', tip: 'Use a bodyweight squat first if needed. Sit back to a bench, then stand smoothly.', swap: 'Swap: leg press' },
  { id: 'cableRow', name: 'Seated cable row', dose: '2 × 8–12', tip: 'Sit tall and pull toward the waist. Keep the body still; avoid swinging.', swap: 'Swap: chest-supported row machine' },
  { id: 'shoulderPress', name: 'Shoulder press machine', dose: '2 × 8–12', tip: 'Adjust handles to shoulder height. Use a light load and a comfortable range.', swap: 'Swap: light dumbbell shoulder press' },
  { id: 'dumbbellRdl', name: 'Dumbbell Romanian deadlift', dose: '2 × 8–10', tip: 'Start very light. Soften the knees, push hips back, and keep weights close to the legs.', swap: 'Swap: unloaded hip-hinge practice' },
  { id: 'hipAbduction', name: 'Hip-abduction machine', dose: '2 × 12–15', tip: 'Sit comfortably and open the knees with control. Use a range that feels good.', swap: 'Swap: glute bridge' },
  { id: 'pallofPress', name: 'Pallof press', dose: '2 × 10 / side', tip: 'Stand sideways to the cable. Press straight out without letting the torso twist.', swap: 'Swap: light resistance band if available' }
];

const week = [
  { key: 'mon', short: 'MON', label: 'Monday', kind: 'Strength A', type: 'strengthA', duration: '35–45 min', title: 'Strength A · full body', subtitle: 'A steady first strength day. Rest about 60–90 seconds between sets and keep every rep comfortable.' },
  { key: 'tue', short: 'TUE', label: 'Tuesday', kind: 'Easy cardio', type: 'cardio', duration: '25–30 min', title: 'Easy cardio · choose your favorite', subtitle: 'Aim for a pace where she can still talk in short sentences. Keep it easy enough to recover for class and tomorrow.' },
  { key: 'wed', short: 'WED', label: 'Wednesday', kind: 'Strength B', type: 'strengthB', duration: '35–45 min', title: 'Strength B · full body', subtitle: 'Move slowly while learning the patterns. It is fine to ask a staff member to check the machine setup.' },
  { key: 'thu', short: 'THU', label: 'Thursday', kind: 'Cardio + reset', type: 'cardioMobility', duration: '25–40 min', title: 'Cardio & a gentle reset', subtitle: 'Pick a low-stress option and finish with a few easy stretches. This should leave her feeling better, not drained.' },
  { key: 'fri', short: 'FRI', label: 'Friday', kind: 'Strength A/B', type: 'alternating', duration: '35–45 min', title: 'Strength day · alternate A and B', subtitle: 'Week 1 repeats Strength A; Week 2 repeats Strength B. Tap the week switch to see the other workout.' },
  { key: 'sat', short: 'SAT', label: 'Saturday', kind: 'Fun movement', type: 'fun', duration: '30–40 min', title: 'Fun movement day', subtitle: 'Choose a movement she actually enjoys. A relaxed walk with a good playlist counts.' },
  { key: 'sun', short: 'SUN', label: 'Sunday', kind: 'Rest', type: 'rest', duration: 'Recovery', title: 'Rest & recharge', subtitle: 'A full rest day supports recovery. Gentle walking is optional if it feels nice.' }
];

const tabRoot = document.querySelector('#day-tabs');
const panel = document.querySelector('#day-panel');
let activeDay = 'mon';
let fridayWeek = Number(localStorage.getItem('strong-steady-friday-week')) || 1;
const progressKey = 'strong-steady-progress-v1';

function progressDayKey(dayKey) {
  return dayKey === 'fri' ? `fri-week${fridayWeek}` : dayKey;
}

function getProgress() {
  try { return JSON.parse(localStorage.getItem(progressKey) || '{}'); }
  catch { return {}; }
}

function saveProgress(progress) {
  localStorage.setItem(progressKey, JSON.stringify(progress));
}

function isDayDone(key) {
  const progress = getProgress();
  return Boolean(progress[progressDayKey(key)]?.done);
}

function renderTabs() {
  tabRoot.innerHTML = week.map(day => `
    <button class="day-tab ${isDayDone(day.key) ? 'is-done' : ''}" id="tab-${day.key}" type="button" role="tab" aria-selected="${activeDay === day.key}" aria-controls="day-panel" tabindex="${activeDay === day.key ? '0' : '-1'}" data-day="${day.key}">
      <span class="day-short">${day.short}</span><span class="day-kind">${day.kind}</span>
    </button>`).join('');
  tabRoot.querySelectorAll('[data-day]').forEach(button => {
    button.addEventListener('click', () => { activeDay = button.dataset.day; renderTabs(); renderPanel(); });
  });
}

function renderExercise(exercise, dayKey) {
  const video = videos[exercise.id];
  const progress = getProgress();
  const checked = Boolean(progress[progressDayKey(dayKey)]?.items?.includes(exercise.id));
  const embed = `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`;
  const watch = `https://www.youtube.com/watch?v=${video.id}`;
  return `<article class="exercise-card">
    <div class="exercise-info">
      <input class="exercise-check" type="checkbox" aria-label="Mark ${exercise.name} complete" data-exercise="${exercise.id}" data-day="${dayKey}" ${checked ? 'checked' : ''} />
      <div class="exercise-copy"><h3>${exercise.name}</h3><p>${exercise.tip} <span class="exercise-swap">${exercise.swap}</span></p></div>
      <span class="rep-pill">${exercise.dose}</span>
    </div>
    <div class="video-frame"><iframe src="${embed}" title="${video.title} exercise demo by ${video.by}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
    <div class="video-caption"><span>Form demo · ${video.by}</span><a href="${watch}" target="_blank" rel="noreferrer">Open on YouTube ↗</a></div>
  </article>`;
}

function activityContent(day) {
  if (day.type === 'cardio') return `<div class="activity-card"><span class="activity-icon" aria-hidden="true">↗</span><div><h3>25–30 minutes at an easy, talkable pace</h3><p>Choose one. Start with 5 minutes easy, move at a comfortable pace, then cool down for 3–5 minutes.</p><div class="activity-options"><span>Treadmill walk</span><span>Stationary bike</span><span>Elliptical</span><span>Outdoor walk</span></div></div></div>`;
  if (day.type === 'cardioMobility') return `<div class="activity-card"><span class="activity-icon" aria-hidden="true">☼</span><div><h3>Easy movement, then a gentle stretch</h3><p>Walk, bike, or use the elliptical for 20–30 minutes. Finish with 5–10 minutes of comfortable mobility. Skip any stretch that causes pain.</p><div class="activity-options"><span>Keep it relaxed</span><span>Take breaks as needed</span></div></div></div>`;
  if (day.type === 'fun') return `<div class="activity-card"><span class="activity-icon" aria-hidden="true">♫</span><div><h3>30–40 minutes of something she likes</h3><p>Pick an activity that feels more like a treat than a chore. She can split it into two shorter sessions if the week is busy.</p><div class="activity-options"><span>Walk with a playlist</span><span>Dance</span><span>Easy bike ride</span><span>Beginner class</span></div></div></div>`;
  return `<div class="recovery-box"><strong>Today's goal:</strong> sleep, eat enough, and let the body recover. There is no workout to make up for later.</div>`;
}

function renderPanel() {
  const day = week.find(item => item.key === activeDay);
  const planType = day.type === 'alternating' ? (fridayWeek === 1 ? 'strengthA' : 'strengthB') : day.type;
  const exerciseItems = planType === 'strengthA' ? strengthA : strengthB;
  const isStrength = planType === 'strengthA' || planType === 'strengthB';
  const progress = getProgress();
  const stateKey = progressDayKey(day.key);
  const completedCount = progress[stateKey]?.items?.length || 0;
  const totalCount = isStrength ? exerciseItems.length : 1;
  const done = Boolean(progress[stateKey]?.done);
  const FridaySwitch = day.type === 'alternating' ? `<button class="week-switch" type="button" id="week-switch" aria-label="Toggle Friday workout week"><strong>WEEK ${fridayWeek}</strong><span>·</span><span>tap to switch</span> ↻</button>` : '';
  const warmup = isStrength ? `<div class="warmup-note"><span aria-hidden="true">☼</span><span><b>Warm up:</b> 5–8 minutes of easy walking or cycling, then one light practice set for the first machine. Rest 60–90 seconds between working sets.</span></div>` : '';
  const content = isStrength ? `<div class="exercise-list">${exerciseItems.map(item => renderExercise(item, day.key)).join('')}</div>` : activityContent(day);

  panel.innerHTML = `<div class="panel-head"><div><p class="panel-kicker">${day.label.toUpperCase()} · ${day.kind.toUpperCase()}</p><h3 class="panel-title">${day.type === 'alternating' ? `Strength ${fridayWeek === 1 ? 'A' : 'B'} · full body` : day.title}</h3><p class="panel-subtitle">${day.subtitle}</p>${FridaySwitch}</div><span class="duration-pill">${day.duration}</span></div>${warmup}${content}<div class="progress-footer"><span>${isStrength ? `${completedCount} of ${totalCount} exercises checked` : done ? 'Session marked complete' : 'Mark the session complete when it feels good'}</span><button type="button" id="complete-day">${done ? 'Completed ✓' : 'Mark day complete'}</button></div>`;

  panel.querySelectorAll('.exercise-check').forEach(input => {
    input.addEventListener('change', () => {
      const state = getProgress();
      const key = progressDayKey(input.dataset.day);
      state[key] ||= { items: [], done: false };
      const items = new Set(state[key].items || []);
      input.checked ? items.add(input.dataset.exercise) : items.delete(input.dataset.exercise);
      state[key].items = [...items];
      state[key].done = state[key].items.length >= exerciseItems.length;
      saveProgress(state);
      const countLabel = panel.querySelector('.progress-footer span');
      if (countLabel) countLabel.textContent = `${state[key].items.length} of ${exerciseItems.length} exercises checked`;
      const completeButton = panel.querySelector('#complete-day');
      if (completeButton) completeButton.textContent = state[key].done ? 'Completed ✓' : 'Mark day complete';
      renderTabs();
    });
  });

  panel.querySelector('#complete-day').addEventListener('click', () => {
    const state = getProgress();
    state[stateKey] ||= { items: [], done: false };
    state[stateKey].done = !state[stateKey].done;
    saveProgress(state); renderTabs(); renderPanel();
  });

  const switchButton = panel.querySelector('#week-switch');
  if (switchButton) switchButton.addEventListener('click', () => {
    fridayWeek = fridayWeek === 1 ? 2 : 1;
    localStorage.setItem('strong-steady-friday-week', String(fridayWeek));
    renderTabs();
    renderPanel();
  });
}

const weightLogKey = 'strong-steady-weight-log-v1';
const weightForm = document.querySelector('#weight-form');
const weightDateInput = document.querySelector('#weight-date');
const weightValueInput = document.querySelector('#weight-value');
const weightStatus = document.querySelector('#weight-status');
const weightSummary = document.querySelector('#weight-summary');
const weightChart = document.querySelector('#weight-chart');
const weightHistory = document.querySelector('#weight-history');
const clearWeightLogButton = document.querySelector('#clear-weight-log');

function localDateInputValue(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function getWeightLog() {
  try {
    const entries = JSON.parse(localStorage.getItem(weightLogKey) || '[]');
    if (!Array.isArray(entries)) return [];
    return entries.filter(entry => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(entry?.date)) return false;
      const weight = Number(entry.weight);
      return Number.isFinite(weight) && weight >= 20 && weight <= 300;
    }).map(entry => ({ date: entry.date, weight: Math.round(Number(entry.weight) * 10) / 10 }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

function saveWeightLog(entries) {
  localStorage.setItem(weightLogKey, JSON.stringify(entries));
}

function formatWeightDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderWeightChart(entries) {
  if (!entries.length) {
    weightChart.innerHTML = '<div class="weight-chart-empty">Your check-ins will appear here. Add the first one whenever you are ready.</div>';
    return;
  }

  const recent = entries.slice(-8);
  const values = recent.map(entry => entry.weight);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(max - min, 1);
  const width = 520;
  const height = 126;
  const left = 24;
  const right = width - 24;
  const top = 18;
  const bottom = height - 18;
  const points = recent.map((entry, index) => {
    const x = recent.length === 1 ? width / 2 : left + (index / (recent.length - 1)) * (right - left);
    const y = bottom - ((entry.weight - min) / spread) * (bottom - top);
    return { x, y, entry };
  });
  const polyline = points.map(point => `${point.x},${point.y}`).join(' ');
  const lines = [0, 1, 2].map(index => {
    const y = top + index * ((bottom - top) / 2);
    return `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" stroke="#f1d7e2" stroke-width="1" />`;
  }).join('');
  const dots = points.map(point => `<circle cx="${point.x}" cy="${point.y}" r="5" fill="#bd5f84" stroke="#fffdfd" stroke-width="2"><title>${formatWeightDate(point.entry.date)}: ${point.entry.weight.toFixed(1)} kg</title></circle>`).join('');
  const valueLabels = recent.length > 1 ? [points[0], points[points.length - 1]].map(point => {
    const y = point.y < top + 20 ? point.y + 18 : point.y - 11;
    return `<text x="${point.x}" y="${y}" text-anchor="middle" fill="#765668" font-size="12" font-family="DM Sans, sans-serif">${point.entry.weight.toFixed(1)}</text>`;
  }).join('') : `<text x="${width / 2}" y="${points[0].y - 12}" text-anchor="middle" fill="#765668" font-size="12" font-family="DM Sans, sans-serif">${recent[0].weight.toFixed(1)} kg</text>`;

  weightChart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="presentation" aria-hidden="true">${lines}<polyline points="${polyline}" fill="none" stroke="#d783a4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />${dots}${valueLabels}</svg>`;
}

function renderWeightTracker() {
  const entries = getWeightLog();
  const latest = entries.at(-1);
  clearWeightLogButton.hidden = entries.length === 0;

  if (!latest) {
    weightSummary.innerHTML = '<div class="weight-stat"><span class="weight-stat-label">Latest check-in</span><span class="weight-stat-value">-- <small>kg</small></span></div>';
    weightHistory.innerHTML = '<li class="weight-history-empty">No check-ins saved yet.</li>';
  } else {
    const first = entries[0];
    const change = latest.weight - first.weight;
    const changeText = `${change > 0 ? '+' : ''}${change.toFixed(1)} kg`;
    weightSummary.innerHTML = `<div class="weight-stat"><span class="weight-stat-label">Latest</span><span class="weight-stat-value">${latest.weight.toFixed(1)} <small>kg</small></span></div><div class="weight-stat"><span class="weight-stat-label">Since first check-in</span><span class="weight-stat-value">${entries.length > 1 ? changeText : 'One check-in'}</span></div>`;
    weightHistory.innerHTML = [...entries].reverse().map(entry => `<li><span>${formatWeightDate(entry.date)}</span><strong>${entry.weight.toFixed(1)} kg</strong><button type="button" data-remove-weight="${entry.date}" aria-label="Remove check-in for ${formatWeightDate(entry.date)}">Remove</button></li>`).join('');
  }

  renderWeightChart(entries);
  weightHistory.querySelectorAll('[data-remove-weight]').forEach(button => {
    button.addEventListener('click', () => {
      const updated = getWeightLog().filter(entry => entry.date !== button.dataset.removeWeight);
      saveWeightLog(updated);
      weightStatus.textContent = 'That check-in was removed. Your history is still saved only in this browser.';
      renderWeightTracker();
    });
  });
}

weightDateInput.max = localDateInputValue();
weightDateInput.value = localDateInputValue();
weightForm.addEventListener('submit', event => {
  event.preventDefault();
  const date = weightDateInput.value;
  const weight = Number(weightValueInput.value);
  if (!date || date > localDateInputValue()) {
    weightStatus.textContent = 'Choose today or an earlier date for this check-in.';
    return;
  }
  if (!Number.isFinite(weight) || weight < 20 || weight > 300) {
    weightStatus.textContent = 'Enter a weight between 20 and 300 kg.';
    return;
  }

  try {
    const entries = getWeightLog();
    const replacesEntry = entries.some(entry => entry.date === date);
    const updated = entries.filter(entry => entry.date !== date);
    updated.push({ date, weight: Math.round(weight * 10) / 10 });
    saveWeightLog(updated.sort((a, b) => a.date.localeCompare(b.date)));
    weightStatus.textContent = replacesEntry
      ? 'Updated that date with the new check-in. It remains saved only in this browser.'
      : 'Check-in saved only in this browser on this device.';
    weightValueInput.value = '';
    weightDateInput.value = localDateInputValue();
    renderWeightTracker();
  } catch {
    weightStatus.textContent = 'This browser could not save the check-in. Check its storage settings and try again.';
  }
});

clearWeightLogButton.addEventListener('click', () => {
  if (!window.confirm('Clear all saved weight check-ins from this browser?')) return;
  try {
    saveWeightLog([]);
    weightStatus.textContent = 'Weight history cleared from this browser.';
    renderWeightTracker();
  } catch {
    weightStatus.textContent = 'This browser could not clear the saved history.';
  }
});

document.querySelector('#reset-progress').addEventListener('click', () => {
  localStorage.removeItem(progressKey);
  renderTabs(); renderPanel();
});

const chatForm = document.querySelector('#chatgpt-form');
const askStatus = document.querySelector('#ask-status');
const promptFallback = document.querySelector('#prompt-fallback');
const promptTextarea = document.querySelector('#prompt-to-copy');

async function copyPreparedPrompt(prompt) {
  if (!navigator.clipboard?.writeText) throw new Error('Clipboard access is unavailable.');
  await navigator.clipboard.writeText(prompt);
}

chatForm.addEventListener('submit', async event => {
  event.preventDefault();
  const question = document.querySelector('#question-input').value.trim();
  if (!question) return;

  const prompt = `I'm using Mikaela's Strong & Steady beginner fitness plan. I'm new to the gym. Please answer in a friendly, simple way, suggest beginner-friendly options when useful, and recommend checking with a qualified professional for pain or medical concerns. My question: ${question}`;
  promptTextarea.value = prompt;
  promptFallback.hidden = true;
  askStatus.textContent = 'Opening ChatGPT and copying the prepared prompt…';
  window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');

  try {
    await copyPreparedPrompt(prompt);
    askStatus.textContent = 'Prompt copied! Paste it into the ChatGPT tab that opened.';
  } catch {
    promptFallback.hidden = false;
    promptTextarea.focus();
    promptTextarea.select();
    askStatus.textContent = 'Copy the prepared prompt below, then paste it into ChatGPT.';
  }
});

document.querySelector('#copy-prompt-fallback').addEventListener('click', async () => {
  try {
    await copyPreparedPrompt(promptTextarea.value);
    askStatus.textContent = 'Prompt copied! Paste it into ChatGPT.';
  } catch {
    promptTextarea.focus();
    promptTextarea.select();
    askStatus.textContent = 'The prompt is selected. Copy it, then paste it into ChatGPT.';
  }
});

renderTabs();
renderPanel();
renderWeightTracker();
