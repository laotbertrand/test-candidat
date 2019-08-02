export const overlay = `<div id="js-popin-overlay" class="kl-popin-overlay kl-hidden"></div>`;

export const PopinTemplate =
`

{{##def.fullscreen:
	{{? it.fullscreen}}
		kl-popin--fullscreen
	{{?}}
#}}

<section class="kl-popin kl-hidden {{=it.content.cssClass}} {{#def.fullscreen}} js-popin" data-name="{{=it.id}}" tabindex="-1" role="dialog" aria-labelledby="{{=it.id}}-title">
	{{##def.colClass:
		{{? it.desktopSize == "s"}}
			col-12 
			col-l-6 col-start-l-4 
			col-xl-4 col-start-xl-5 
			col-xxl-4 col-start-xxl-5
		{{?? it.desktopSize == "m"}}
			col-12 
			col-l-10 col-start-l-2 
			col-xl-6 col-start-xl-4 
			col-xxl-6 col-start-xxl-4
		{{?? it.desktopSize == "l"}}
			col-12 
			col-l-10 col-start-l-2 
			col-xl-8 col-start-xl-3 
			col-xxl-8 col-start-xxl-3
		{{?}}
	#}}

	
	<div class="kl-popin__inner {{#def.colClass}} js-popin-inner">
	    <header class="kl-popin__header js-popin-header">

			{{? it.content.headerHTML}}
				{{=it.content.headerHTML}}
			{{??}}
		    	{{? !it.blocked}}
		            <button class="kl-popin__close js-close-popin" aria-label="Fermer">
		                <svg class="ku-icon-24"><use xlink:href="#Navigation_Display_Close_24px" href="#Navigation_Display_Close_24px"></use></svg>
		            </button>
		        {{?}}

		        <h1 class="kl-popin__title ka-title-bold-l" id="{{=it.id}}-title">
		        	{{=it.content.title}}
		        </h1>

		        {{? it.content.subTitle}}
					<h2 class="kl-popin__subtitle">
						{{=it.content.subTitle}}
					</h2>
				{{?}}
			{{?}}
	    </header>

	    <main class="kl-popin__body js-popin-body">
			{{=it.content.contentHTML}}
		</main>

		{{? it.content.footerHTML}}
			<footer class="kl-popin__footer js-popin-footer">
				{{=it.content.footerHTML}}
			</footer>
		{{?}}
	</div>

</section>
`;
