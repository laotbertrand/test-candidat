const tooltipHidden = "kl-hidden";

/**
* @param elementSelector : String
* @param onOpen: function
* @param onClose: function
*/

class Tooltip {
   constructor(elementSelector, onOpen = () => { }, onClose = () => { }) {
       this.tooltip = document.querySelector(`${elementSelector}`);
       this.button = this.tooltip.querySelector('.js-tooltip__button');
       this.wrapper = this.tooltip.querySelector('.js-tooltip__wrapper');
       this.pointer = this.tooltip.querySelector('.js-tooltip__pointer');
       this.closeButton = this.tooltip.querySelector('.js-tooltip__close-button');
       this.onOpen = onOpen;
       this.onClose = onClose;
       this.lastActiveElement = null;
       this.displayed = false;

       /** get the first element of the popin to be able to loop */
       this.firstFocusable = this.wrapper.querySelector('button.js-tooltip__close-button') || this.wrapper;

       this.button.addEventListener("click", () => {
           this.open();
       });


       this.closeButton.addEventListener("click", () => {
           this.close();
       });

       /** keyboard management */
       this.restrictFocus();
       this.escapeTooltip();

   }

   open() {

       /** get the element of the DOM who has the focus */
       this.lastActiveElement = document.activeElement;

       /** Give accessibility to the popin */
       this.wrapper.setAttribute('tabindex', '0');
       this.wrapper.setAttribute('aria-hidden', 'false');

       /** Give focus to first focusable Element */
       this.firstFocusable.focus();

       this.displayed = true;
       this.wrapper.classList.remove(tooltipHidden);
       this.pointer.classList.remove(tooltipHidden);
       this.onOpen();
   }

   close() {

       /** Give focus to the last body element which have focused */
       this.lastActiveElement.focus();

       /** Reset tabindex */
       this.wrapper.setAttribute('tabindex', '-1');
       this.wrapper.setAttribute('aria-hidden', 'true');

       this.displayed = false;
       this.wrapper.classList.add(tooltipHidden);
       this.pointer.classList.add(tooltipHidden);
       this.onClose();
   }

   restrictFocus() {
       document.addEventListener('focus', (event) => {
           console.log(event.target.getAttribute('data-name'));
           if (!this.wrapper.matches('.kl-hidden') && !this.wrapper.contains(event.target) && event.target.getAttribute('data-name') !== null) {
               event.stopPropagation();
               this.firstFocusable.focus();
           }
       }, true);
   }

   escapeTooltip() {
       document.addEventListener('keydown', (event) => {
           if ((event.keyCode === 27 || event.code === "Escape") && this.displayed) {
               this.close();
           }
       });
   }
}

export default Tooltip;