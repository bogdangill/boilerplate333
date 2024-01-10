import { Ripple } from "./ripple.js";

const rippleTargetsPrimary = document.querySelectorAll(".pmgt-button--primary[data-ripple='btn']");
const rippleTargetsOutline = document.querySelectorAll(".pmgt-button--outline[data-ripple='btn']");

console.log(rippleTargetsPrimary);

for (let target of rippleTargetsPrimary) {
    new Ripple(target, {
        circleTag: 'span',
        circleColor: 'default',
        enableForDesktop: true
    });
}
for (let target of rippleTargetsOutline) {
    new Ripple(target, {
        circleTag: 'span',
        circleColor: 'primary',
        enableForDesktop: true
    });
}