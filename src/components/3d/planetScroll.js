export const SECTION_IDS = ['home', 'project', 'services', 'experience', 'contactus'];

export function getActiveIdx() {
  const mid = window.scrollY + window.innerHeight * 0.5;
  let idx = 0;
  for (let i = 0; i < SECTION_IDS.length; i++) {
    const el = document.getElementById(SECTION_IDS[i]);
    if (el && el.offsetTop <= mid) idx = i;
  }
  return idx;
}
