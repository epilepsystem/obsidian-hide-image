import { Plugin, Notice } from 'obsidian';

export default class HideImage extends Plugin {
	private isHide: boolean = false;

	async onload(): Promise<void> {
		this.addStyles();
		
		this.addCommand({
			id: 'toggle-images',
			name: 'Hide/Show Images',
			callback: () => this.toggle()
		});

		this.addRibbonIcon('image', 'Hide/Show Images', () => this.toggle());
		
		this.registerEvent(
			this.app.workspace.on('layout-change', () => {
				if (this.isHide) {
					this.applyHidden();
				}
			})
		);
	}

	onunload(): void {
		this.removeStyles();
		document.body.classList.remove('image-toggle-hidden');
	}

	private addStyles(): void {
		const style = document.createElement('style');
		style.id = 'image-toggle-styles';
		style.textContent = `
			body.image-toggle-hidden img,
			body.image-toggle-hidden .internal-embed[src$=".png"],
			body.image-toggle-hidden .internal-embed[src$=".jpg"],
			body.image-toggle-hidden .internal-embed[src$=".jpeg"],
			body.image-toggle-hidden .internal-embed[src$=".gif"],
			body.image-toggle-hidden .internal-embed[src$=".webp"],
			body.image-toggle-hidden .internal-embed[src$=".svg"],
			body.image-toggle-hidden .internal-embed[src$=".PNG"],
			body.image-toggle-hidden .internal-embed[src$=".JPG"],
			body.image-toggle-hidden .internal-embed[src$=".JPEG"],
			body.image-toggle-hidden .internal-embed[src$=".GIF"] {
				display: none !important;
			}
		`;
		document.head.appendChild(style);
	}

	private removeStyles(): void {
		const style = document.getElementById('image-toggle-styles');
		if (style) {
			style.remove();
		}
	}

	private toggle(): void {
		console.log('Image Toggle');
		this.isHide = !this.isHide;
		
		if (this.isHide) {
			this.applyHidden();
			new Notice('Hide Images');
		} else {
			document.body.classList.remove('image-toggle-hidden');
			new Notice('Show Images');
		}
	}

	private applyHidden(): void {
		document.body.classList.add('image-toggle-hidden');
	}
}