import Collapse from './collapse/_collapse';

const COLLAPSEDCLASS = "is-collapsed";
const ACCORDIONCLASS = {
  accordion: 'js-accordion',
  header: 'js-accordion__header',
  iconContainer: 'js-accordion__icon-container',
  icon: 'js-accordion__icon',
  iconMore: 'js-accordion__icon-more',
  iconLess: 'js-accordion__icon-less',
  panel: 'js-accordion__panel'
};
const HIDDENCLASS = "kl-hidden";

class Accordion extends Collapse {
  constructor(options) {
    super(options.id);
    this.options = options;
    // _this = this;
    this.container = document.getElementById(this.options.id);
    this.headers = this.container.querySelectorAll('.' + ACCORDIONCLASS.header);
    this.init();
  }

  init() {
    lm.forEach(this.headers, (header, i) => {
      let _container = lm.getClosest(header, '.' + ACCORDIONCLASS.accordion);
      let panel = header.nextElementSibling;
      let _panels = _container.querySelectorAll('.' + ACCORDIONCLASS.panel);
      let count = i + 1;

      this.setAccessibility({
        type: "header",
        elt: header,
        id: this.options.id,
        count: count
      });

      lm.forEach(_panels, (panel, i) => {
        this.setAccessibility({
          type: "panel",
          elt: panel,
          id: this.options.id,
          count: count
        });
        panel.dataset.panel = i + 1;
      });
      let iconContainer = header.querySelector('.' + ACCORDIONCLASS.iconContainer);

      if (this.options.defaultOpen) {
        if (this.options.defaultOpen.indexOf(panel.dataset.panel) === -1) {
          this.toggle(panel);
        } else {
          this.toggleHeaderIcons(iconContainer);
        }
      } else {
        this.toggle(panel);
      };

      header.addEventListener('click', (e) => {
        e.preventDefault();

        // Cible le panel suivant le header cliqué et le toggle
        let currentPanel = header.nextElementSibling;
        this.toggle(currentPanel);

        if (iconContainer) {
          this.toggleHeaderIcons(iconContainer);
          this.otherIconsBehavior(this.headers, header);
        }

        // Comportement des autres panels au click
        this.otherPanelsBehavior(_panels, currentPanel);
      });
    });
  }

  otherPanelsBehavior(panels, currentPanel) {
    if (this.options.mode !== 'open') {
      // Ferme tous les autres panels du même container
      lm.forEach(panels, (_panel) => {
        if (_panel != currentPanel) {
          if (!_panel.classList.contains(COLLAPSEDCLASS)) {
            this.toggle(_panel);
          }
        }
      });
    }
  }

  toggleHeaderIcons(iconContainer) {
    let iconMore = iconContainer.querySelector('.' + ACCORDIONCLASS.iconMore);
    let iconLess = iconContainer.querySelector('.' + ACCORDIONCLASS.iconLess);

    if (iconMore.classList.contains(HIDDENCLASS)) {
      iconMore.classList.remove(HIDDENCLASS);
      iconLess.classList.add(HIDDENCLASS);
    } else if (iconLess.classList.contains(HIDDENCLASS)) {
      iconMore.classList.add(HIDDENCLASS);
      iconLess.classList.remove(HIDDENCLASS);
    }
  }

  otherIconsBehavior(headers, currentHeader) {
    if (this.options.mode !== 'open') {
      lm.forEach(headers, (_header) => {
        if (_header != currentHeader) {
          let iconMore = _header.querySelector('.' + ACCORDIONCLASS.iconMore);
          let iconLess = _header.querySelector('.' + ACCORDIONCLASS.iconLess);
          iconMore.classList.remove(HIDDENCLASS);
          iconLess.classList.add(HIDDENCLASS);
        }
      });
    }
  }

  setAccessibility(params) {
    params.elt.setAttribute("id", `${params.id}${params.type}${params.count}`);
    if (params.type == "panel") {
      params.elt.setAttribute("aria-labelledby", `${params.id}header${params.count}`);
      params.elt.setAttribute("role", "tabpanel");
    } else if (params.type = "header") {
      params.elt.setAttribute("tabindex", "0");
      params.elt.setAttribute("aria-controls", `${params.id}panel${params.count}`);
      params.elt.setAttribute("role", "tab");
    }
  }
}

export default Accordion;
