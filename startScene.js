// Class do StartScene
class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	// Criando texto e cena de início
	create() {
		this.add.text( larguraJogo / 2.5, alturaJogo / 2 + 30, 'Click to start!', { fontSize: '20px', color:'#ffffff'});
		this.input.on('pointerdown', () => {
			this.scene.stop('StartScene');
			this.scene.start('GameScene');
		})
	}
}