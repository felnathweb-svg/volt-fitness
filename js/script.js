const classes = [
  { day: "Mon", time: "6:00 AM", title: "Strength Foundation", type: "Strength", trainer: "Maya", duration: "50 min", spots: 8, level: "All levels" },
  { day: "Mon", time: "12:00 PM", title: "HIIT Engine", type: "HIIT", trainer: "Jordan", duration: "40 min", spots: 5, level: "Intermediate" },
  { day: "Tue", time: "7:00 AM", title: "Mobility Flow", type: "Yoga", trainer: "Elena", duration: "45 min", spots: 10, level: "All levels" },
  { day: "Tue", time: "6:00 PM", title: "Boxing Club", type: "Boxing", trainer: "Chris", duration: "55 min", spots: 6, level: "High energy" },
  { day: "Wed", time: "5:30 PM", title: "Lower Body Power", type: "Strength", trainer: "Maya", duration: "50 min", spots: 4, level: "Advanced" },
  { day: "Thu", time: "6:30 AM", title: "Sweat Circuit", type: "HIIT", trainer: "Jordan", duration: "45 min", spots: 7, level: "Intermediate" },
  { day: "Fri", time: "9:00 AM", title: "Reset Yoga", type: "Yoga", trainer: "Elena", duration: "50 min", spots: 11, level: "Recovery" },
  { day: "Fri", time: "5:00 PM", title: "Fight Night Skills", type: "Boxing", trainer: "Chris", duration: "60 min", spots: 3, level: "Advanced" }
];

const trainers = [
  {
    name: "Maya Torres",
    short: "MT",
    role: "Strength Director",
    certs: "CSCS, USAW-L1",
    bio: "Maya builds practical strength plans for busy professionals, athletes, and anyone ready to train with intent. Her sessions focus on form, confidence, and measurable progression."
  },
  {
    name: "Jordan Hayes",
    short: "JH",
    role: "HIIT Coach",
    certs: "NASM-CPT, Precision Nutrition",
    bio: "Jordan brings sharp pacing and upbeat coaching to conditioning classes. Expect smart intervals, clean movement standards, and a finish that feels earned."
  },
  {
    name: "Elena Brooks",
    short: "EB",
    role: "Mobility Specialist",
    certs: "RYT-500, FRC Mobility",
    bio: "Elena helps members recover, move freely, and build durable range of motion. Her coaching is calm, precise, and deeply supportive."
  },
  {
    name: "Chris Walker",
    short: "CW",
    role: "Boxing Coach",
    certs: "USA Boxing, ACE-CPT",
    bio: "Chris teaches crisp boxing technique with serious cardio impact. His classes blend footwork, bag rounds, and confidence-building skill work."
  }
];

const testimonials = [
  { quote: "Volt made training feel exciting again. The schedule is easy, the coaches remember my goals, and the energy is unreal.", name: "Avery M." },
  { quote: "I joined for strength classes and stayed for the people. Everything feels premium without feeling intimidating.", name: "Dani R." },
  { quote: "The Pro membership paid for itself fast. Better workouts, better recovery, and a clear plan every week.", name: "Marcus T." }
];

const scheduleList = document.querySelector("[data-schedule-list]");
const trainerList = document.querySelector("[data-trainer-list]");
const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector("[data-modal-content]");
const filters = document.querySelectorAll("[data-filter]");
let testimonialIndex = 0;

function renderSchedule() {
  const active = Object.fromEntries([...filters].map((filter) => [filter.dataset.filter, filter.value]));
  const filtered = classes.filter((item) => {
    return Object.entries(active).every(([key, value]) => value === "all" || item[key] === value);
  });

  scheduleList.innerHTML = filtered.map((item) => `
    <article class="class-card">
      <div class="class-top">
        <div>
          <p class="class-meta">${item.day} · ${item.type}</p>
          <h3>${item.title}</h3>
        </div>
        <span class="class-time">${item.time}</span>
      </div>
      <p>${item.trainer} · ${item.duration} · ${item.level}</p>
      <p>${item.spots} spots remaining</p>
      <a class="button button-secondary" href="#booking">Book Class</a>
    </article>
  `).join("") || `<p>No classes match those filters. Try a different combination.</p>`;
}

function renderTrainers() {
  trainerList.innerHTML = trainers.map((trainer, index) => `
    <article class="trainer-card">
      <div class="trainer-avatar"><span class="trainer-initials">${trainer.short}</span></div>
      <h3>${trainer.name}</h3>
      <p>${trainer.role}</p>
      <p>${trainer.certs}</p>
      <button class="button button-secondary" type="button" data-trainer="${index}">View Bio</button>
    </article>
  `).join("");
}

function openTrainer(index) {
  const trainer = trainers[index];
  modalContent.innerHTML = `
    <p class="eyebrow">${trainer.role}</p>
    <h2 id="modal-title">${trainer.name}</h2>
    <p><strong>Certifications:</strong> ${trainer.certs}</p>
    <p>${trainer.bio}</p>
    <a class="button" href="#booking" data-modal-close>Book With ${trainer.name.split(" ")[0]}</a>
  `;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

function renderTestimonial() {
  const testimonial = testimonials[testimonialIndex];
  document.querySelector("[data-testimonial] p").textContent = `“${testimonial.quote}”`;
  document.querySelector("[data-testimonial] cite").textContent = testimonial.name;
}

function animateCounter(counter) {
  const target = Number(counter.dataset.counter);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    counter.textContent = Math.floor(target * progress).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

document.querySelector("[data-nav-toggle]").addEventListener("click", (event) => {
  const panel = document.querySelector("[data-nav-panel]");
  const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
  event.currentTarget.setAttribute("aria-expanded", String(!expanded));
  panel.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

document.querySelector("[data-nav-panel]").addEventListener("click", () => {
  document.querySelector("[data-nav-panel]").classList.remove("open");
  document.querySelector("[data-nav-toggle]").setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
});

document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

filters.forEach((filter) => filter.addEventListener("change", renderSchedule));

trainerList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-trainer]");
  if (button) openTrainer(button.dataset.trainer);
});

modal.addEventListener("click", (event) => {
  if (event.target.closest("[data-modal-close]")) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

document.querySelectorAll("[data-billing]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-billing]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("[data-price]").forEach((price) => {
      price.textContent = `$${price.dataset[button.dataset.billing]}`;
    });
  });
});

document.querySelector("[data-bmi-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const height = Number(form.height.value);
  const weight = Number(form.weight.value);
  const bmi = (weight / (height * height)) * 703;
  let category = "healthy range";
  if (bmi < 18.5) category = "below the typical range";
  if (bmi >= 25) category = "above the typical range";
  if (bmi >= 30) category = "well above the typical range";
  document.querySelector("[data-bmi-result]").textContent = `BMI ${bmi.toFixed(1)} · ${category}. A coach can help personalize the next step.`;
});

document.querySelector("[data-booking-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const phoneDigits = form.phone.value.replace(/\D/g, "");
  const status = document.querySelector("[data-form-status]");

  if (phoneDigits.length < 10) {
    status.textContent = "Please enter a valid phone number.";
    return;
  }

  status.textContent = "Trial request received. The front desk will follow up shortly.";
  form.reset();
});

document.querySelector("[data-testimonial-prev]").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});

document.querySelector("[data-testimonial-next]").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    entry.target.querySelectorAll("[data-counter]").forEach((counter) => {
      if (!counter.dataset.done) {
        counter.dataset.done = "true";
        animateCounter(counter);
      }
    });
  });
}, { threshold: 0.16 });

document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));

renderSchedule();
renderTrainers();
renderTestimonial();
