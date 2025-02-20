// Adicionado class, o planejamento de um objeto
class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

        // como usei class não precisa da palavra function
        preload() {
            this.load.image('background', 'assets/bg.png');
            this.load.image('player', 'assets/alienigena.png');
            this.load.image('turbo', 'assets/turbo.png');
            this.load.image('plataforma', 'assets/tijolos.png');
            this.load.image('moeda', 'assets/moeda.png');
            this.load.spritesheet('caldeirao', 'assets/caldeirao.png', { frameWidth: 40, frameHeight: 75 });
        }

        create() {
            // adicionando bg
            this.add.image(larguraJogo / 2, alturaJogo / 2, 'background');

            // adicionando o fogo
            this.fogo = this.add.sprite(0, 0, 'turbo');
            this.fogo.setVisible(false);

            // adicionando o alienigena
            this.alien = this.physics.add.sprite(larguraJogo / 2, 0, 'player');

            // adicionando barreiras
            this.alien.setCollideWorldBounds(true);

            // adicionando teclado
            this.teclado = this.input.keyboard.createCursorKeys();

            // adicionando plataforma
            this.plataforma = this.physics.add.staticImage(larguraJogo / 1.6, alturaJogo / 2, 'plataforma');
            this.physics.add.collider(this.alien, this.plataforma);

            // adicionando spritesheet caldeirao
            this.caldeirao = this.physics.add.sprite(100, 200, 'caldeirao').setScale(2); 
            this.anims.create({
                key: 'caldeirao',
                frames: this.anims.generateFrameNumbers('caldeirao', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
            this.caldeirao.anims.play('caldeirao', true);
            this.caldeirao.setCollideWorldBounds(true)

            // adicionado plataforma 2
            this.plataforma = this.physics.add.staticImage(larguraJogo / 5.5, alturaJogo / 1.5, 'plataforma');
            this.physics.add.collider(this.caldeirao, this.plataforma);
            this.physics.add.collider(this.alien, this.plataforma);

           
            //adicionando moeda
            this.moeda = this.physics.add.sprite(larguraJogo/2, 0, 'moeda');
            this.moeda.setCollideWorldBounds(true); 
            this.moeda.setBounce(0.7);
            this.physics.add.collider(this.moeda, this.plataforma);

            // inicializando a variável com a pontuação
            this.pontuacao = 0;
           
            // adicionando placar 
            this.placar = this.add.text(75, 200, 'Moedas:' + this.pontuacao, {fontSize: '45px', fill: '#495613'});

            this.physics.add.overlap(this.alien, this.moeda, () => { //callback

                this.moeda.setVisible(false); // moeda fica invisivel
                
                this.posicaoMoeda_Y = Phaser.Math.RND.between(50, 650); // sorteia número
                this.moeda.setPosition(this.posicaoMoeda_Y, 100); // ajusta a posição da moeda
               
                this.pontuacao +=1; // soma pontuação
                this.placar.setText('Moedas:' + this.pontuacao); // atualiza texto do placar
                
                this.moeda.setVisible(true); // ativa a visão de "nova moeda"
            });

    
        }

            update() {

                // movimentação do alienigena esquerda
                if (this.teclado.left.isDown) {
                    this.alien.setVelocityX(-150);
                }

                // movimentação do alienigena direita
                else if (this.teclado.right.isDown) {
                    this.alien.setVelocityX(150);
                }

                // sem movimentação horizontal
                else {
                    this.alien.setVelocityX(0);
                }

                // movimentação do alienigena para cima
                if (this.teclado.up.isDown) {
                    this.alien.setVelocityY(-150);
                    this.ativarTurbo();
                }

                //movimentação do alienigena para baixo
                else { this.semTurbo(); }

                // atualizando possição do fogo ao alien
                this.fogo.setPosition(this.alien.x, this.alien.y + this.alien.height / 2);
            }

            // Ativando turbo
            ativarTurbo() {
                this.fogo.setVisible(true);
            }

            // Desativando turbo
            semTurbo() {
                this.fogo.setVisible(false);
            }

}