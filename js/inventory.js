angular.
	module('app').
		factory('inventory', function() {

			var gamesLibrary = []
			var consoleLibrary = []
			var bundles = []



			var Game = function(name, description, console, price, image){
				this.name = name;
				this.description = description;
				this.console = console;
				this.price = price;
				this.image = image;
				gamesLibrary.push(this)
			}

			var Console = function(name, description, price, image){
				this.name = name;
				this.description = description;
				this.price = price;
				this.image = image;
				consoleLibrary.push(this)
			}

			var Bundle = function(console, games, price, image){
				this.console = console;
				this.games = games;
				this.price = price;
				this.image = image;
				bundles.push(this)
			}



			// Consoles
			var nintendo64 = new Console(
				'Nintendo 64',
				"Nintendo 64's popularity among younger gamers is no surprise. Well-respected games featuring such long-lived and much-loved personalities as Mario (of arcade classic Donkey Kong fame), Zelda, and Banjo-Kazooie are easy to learn and offer enormous replay value. But times are a' changin' and the system's ever-growing library of titles has expanded into every genre of games imaginable, including games better-suited for older gamers. In fact, some of the most acclaimed--in some cases, groundbreaking--games available on any platform today are packed onto N64's old-school cartridges.",
				20,
				'http://ecx.images-amazon.com/images/I/41wX7ndoOzL.jpg'
				)
			var playstation4 = new Console(
				'Playstation 4',
				"The PlayStation 4 system opens the door to an incredible journey through immersive new gaming worlds and a deeply connected gaming community. PS4 puts gamers first with an astounding launch lineup and over 180 games in development. Play amazing top-tier blockbusters and innovative indie hits on PS4. Developer Inspired, Gamer Focused.",
				25,
				'https://images-na.ssl-images-amazon.com/images/G/01/img15/video-games/PS4/PS4-console-hero.jpg'
				)
			var xboxone = new Console(
				'Xbox One',
				"Introducing Xbox One. Where the best games, multiplayer, and your favorite movies, music, sports, and live TV come together in one place. Xbox One games look and feel incredibly real, with cinematic gameplay that rivals Hollywood. Watch TV or chat with friends on Skype while you play, and keep on playing while smarter matchmaking happens behind the scenes. With Xbox One, you can snap two things side-by-side on your TV, and switch from one to another instantly. Cloud-powered and built for the digital age, Xbox One is designed to keep getting better over time.* Xbox One delivers an all-new gaming and entertainment experience that will transform how you play. Xbox One brings together the best games, the most reliable service and rich entertainment all-in-one system that is built for today and tomorrow.",
				25,
				'http://g-ecx.images-amazon.com/images/G/01/aplusautomation/vendorimages/9e700249-cf1e-4312-98f7-1e978264320c._CB314073699__SR970,300_.jpg'
				)
			var supernintendo = new Console(
				'Super Nintendo',
				"After Sega unleashed the 16-bit Genesis, Nintendo was at a crossroads because their classic 8-bit Nintendo system was dying out. So Nintendo makes their own 16-bit system, but used a much better graphics and sound chip than the Genesis had, and remained the top system until Sony's Playstation came out in 1996. What made the Super NES kick so much was its outstanding library of games. The first party titles were out of this world, not to mention the system also had some of the best RPG's to date on any system. All in all, if you can find a Super NES anywhere, I highly recommend buying one, its a piece of video game history, and Nintendo has not been able to make a better system yet.",
				10,
				'http://ecx.images-amazon.com/images/I/31%2BFX0nFYRL._SX385_.jpg'
				)
			var playstation = new Console(
				'Playstation',
				"Sony's Original Playstation console revolutionized console gaming and brought a massive library of affordable games and hardware to the public. With it's release, Sony established itself as one of the biggest names in the gaming industry.",
				15,
				'http://ecx.images-amazon.com/images/I/61GjiXUw2HL._SX385_.jpg'
				)
			var wiiu = new Console(
				'Wii U',
				"Discover a world where you don't play video games, you live them where your friends, movies, TV shows and the Web all collide. Take entertainment into your own hands and eliminate the barriers between you and the gaming world with the Nintendo Wii U Console. The Wii U gives you a second window into the gaming world through the GamePad, a revolutionary controller which features an interactive touch screen for you to control your on-screen adventure.",
				20,
				'http://ecx.images-amazon.com/images/I/71oHatSEvBL._SL1500_.jpg'
				)
			
			// Games
			var supersmashbros = new Game(
				'Super Smash Brothers',
				'Four-player action fighter, starring 12 Nintendo mascots, including Mario, Luigi, Fox, Link, Samus, Pikachu, Jigglypuff and Captain Falcon. All the action takes place on one screen, from a zoomed out third-person perspective more reminiscent of old-school platformers than traditional fighting games. The premise is as simple as the controls. Beat up you opponents and knock them off the fighting platform to score a point. The more damage your opponents sustain, the farther you can throw them. Apart from the quick, but explosive mayhem that ensues when more than one player has at gfit, the game manages to bring back many fond gaming memories by bombarding players with familiar items, power-ups and many classic tunes.',
				nintendo64.name,
				15,
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZJQTGkB7UedsOhNzn4MiLbOZI7Zz1Awz-kxEpYqwkjchQ8zMiA'
				)
			var uncharted4collection = new Game(
				'Uncharted: The Nathan Drake Collection = Playstation 4',
				"From the groundbreaking storytellers at Naughty Dog, comes the genre-defining epic that revolutionized adventure storytelling, rebuilt by Bluepoint Games with the power of the PS4 system. Experience one of the most revered game series of all time as you follow the perilous journey of Nathan Drake across the globe, from humble beginnings to extraordinary discoveries. Meet an unforgettable cast of characters as Drake puts life and friendship on the line in a race against ruthless enemies to uncover unimaginable treasure. UNCHARTED: The Nathan Drake Collection includes the single player campaigns for UNCHARTED: Drake's Fortune, UNCHARTED 2: Among Thieves, and UNCHARTED 3: Drake's Deception.",
				playstation4.name,
				10,				
				'http://ecx.images-amazon.com/images/I/91ymHXDTSuL._SL1500_.jpg'
				)
			var metalgearsolid5 = new Game (
				'Metal Gear Solid V: The Phantom Pain',
				"The Soviet invasion of Afghanistan has brought a new edge to the Cold War, and in 1984, a one-eyed man with a prosthetic arm appears in the country. Those who know him call him Snake; the legendary mercenary who was once swept from the stage of history and left in a coma by American private intelligence network Cipher. Snake is accompanied by Ocelot, an old friend who saved him from attack when he finally awoke. Now, Snake's former partner Kazuhira Miller is being held by the Soviet forces in Afghanistan. Snake must undertake a solo mission to rescue Miller and prove to the world that the legendary mercenary is not dead and gone. That first step will lead to a path of vengeance against the very Cipher that slaughtered so many of Snake's men, and to a battle that will embroil the whole world...",
				[playstation4.name, xboxone.name],
				10,
				'http://ecx.images-amazon.com/images/I/91%2BwlIt-vDL._SL1500_.jpg'
				)
			var supermarioworld = new Game (
				'Super Mario World',
				"Mario's first team-up with Yoshi, and an absolutely magical first release on the greatest console generation we've seen in video game history thus far.",
				supernintendo.name,
				10,
				'http://ecx.images-amazon.com/images/I/91z1reLFbHL._SL1500_.jpg'
				)
			var crashteamracing = new Game (
				'Crash Team Racing',
				"Crash Bandicoot is back to take on friends and foes in Crash Team Racing. Featuring outrageous kart racing, CTR includes 8 characters with unique racing capabilities. Journey through dozens of races, battle in the arena or take on 3 of your friends in awesome multiplayer action. Made in USA.",
				playstation.name,
				10,
				'http://ecx.images-amazon.com/images/I/71IHOvJhwRL._SL1260_.jpg'
				)
			var supermariomaker = new Game (
				'Super Mario Maker',
				"Mario experience of your dreams has arrived and is bursting with creativity…including yours! Play a near-limitless number of intensely creative Super Mario levels from players around the world. It’s easy enough to create your own levels with the Wii U GamePad controller that it may feel like you’re simply sketching out your ideas on paper, but you can now bring enemies and objects into a playable course in ways you could only dream of before. What was impossible in  traditional Mario games is now impossibly fun, so let your imagination run wild!",
				wiiu.name,
				15,
				'http://ecx.images-amazon.com/images/I/817mJl8ozIL._SL1500_.jpg'
				)
			var mariokart8 = new Game (
				'Mario Kart 8',
				"Feel the rush as your kart rockets across the ceiling. Race upside-down and along walls on anti-gravity tracks in the most action-fueled Mario Kart game yet. Take on racers across the globe and share videos of your greatest moments via Mario Kart TV.",
				wiiu.name,
				15,
				'http://ecx.images-amazon.com/images/I/91LQiO6JrbL._SL1500_.jpg'
				)
			var supersmashbroswiiu = new Game (
				'Super Smash Bros. - Wii U',
				"Battle it out as Nintendo's greatest heroes on the Wii U console Face off against the biggest roster of Nintendo all-stars ever assembled! Send your rivals flying with powerful attacks to earn all-new customizations and equipment that trick out your fighter's moves and stats. Then power-up and train intelligent amiibo figures* to take on your friends! The multiplayer showdown** you know and love is now on the Wii U console!",
				wiiu.name,
				'http://ecx.images-amazon.com/images/I/A1M9vDLg1DL._SL1500_.jpg'
				)


			// Bundles

			return	{
				gamesLibrary : gamesLibrary,
				consoleLibrary : consoleLibrary,
				bundles : bundles,
			}

})
