angular.module('cust', ['ngRoute', 'ngMaterial', 'ngMessages', 'util'] );


angular
	.module('cust')
		.controller('main', ['$scope', '$rootScope', '$http', 'inventory', '$route', '$routeParams', '$location', '$mdDialog', '$mdMedia', function($scope, $rootScope, $http, inventory, $route, $routeParams, $location, $mdDialog, $mdMedia){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
			
			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
					console.log($scope.gamesList)
				})	
			inventory.getConsolesList().then(function(returnData){
					$scope.consolesList = returnData.data
					console.log($scope.consolesList)
				})	

			inventory.getTopGames().then(function(returnData){
					$scope.topGames = returnData.data
					console.log($scope.topGames)
				})

			inventory.getTopConsoles().then(function(returnData){
					$scope.topConsoles = returnData.data
					console.log($scope.topConsoles)
				})


			// console.log($scope.topGames)
			// console.log($scope.topConsoles)

			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consoleLibrary, function(item){
				// console.log(item)
				// console.log($scope.$routeParams)
				return item.name === $scope.$routeParams.console

			})
			}

			$scope.search = {search : ""}

			// For async search
			$scope.searchQuery = function(){
				if($scope.search.search.length > 3) {
				console.log('change documented')
				$http({
					method: 'POST',
					url   : 'api/search',
					data  : $scope.search
				}).then(function(returnData, err){
					$scope.searchResults = returnData.data
					console.log($scope.searchResults, err)
				})
			}
		}


			$http.get('/api/me')
			    .then(function(returnData){
			        if(returnData.data.user){
			           console.log(returnData)
			           $rootScope.user = returnData.data.user;
			           $rootScope.currentUserSignedIn = true;
			        }
			        else {
			            // No user :(
			           console.log("no user")
			        }
			    })

			// FOR RANDOM IMAGES ON PARALLAX
			var classics = _.shuffle(['http://vignette3.wikia.nocookie.net/ssb/images/a/a8/Super_Smash_Bros._-_North_American_Boxart.png/revision/latest?cb=20120303165816', 
			'http://ecx.images-amazon.com/images/I/51j0pgLfMlL.jpg', 
			'http://ecx.images-amazon.com/images/I/51pulR98CeL.jpg', 
			'http://www.loveroms.com/assets/data/nintendo-64/resident-evil-2-(u)-nintendo-64', 
			'http://ecx.images-amazon.com/images/I/51ZGP0N3V9L.jpg', 
			'http://media.gamestats.com/gg/image/object/014/014400/mariotennis64_n64box.jpg', 
			"https://upload.wikimedia.org/wikipedia/en/4/4b/Yoshi's_Story.jpg", 
			'http://ecx.images-amazon.com/images/I/51zFNLV%2BoEL.jpg', 
			'http://ecx.images-amazon.com/images/I/51eAdm1k1uL.jpg', 
			'http://ecx.images-amazon.com/images/I/516wluEIzmL.jpg', 
			'http://ecx.images-amazon.com/images/I/513bv0mySHL.jpg', 
			'http://ecx.images-amazon.com/images/I/71fzEw4A6IL.gif', 
			'http://ecx.images-amazon.com/images/I/515TT5TRGQL.jpg', 
			'http://ecx.images-amazon.com/images/I/51CXdLRZthL.jpg', 
			'http://ecx.images-amazon.com/images/I/51Ou02%2BfT8L.jpg', 
			'http://ecx.images-amazon.com/images/I/613Feh1FlKL.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/6/63/StarFox64_N64_Game_Box.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/7/7e/Mario_Kart_64box.png', 
			'http://ecx.images-amazon.com/images/I/51cBGTEKKGL.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/3/36/GoldenEye007box.jpg', 
			'http://ecx.images-amazon.com/images/I/51HJDRbM7mL.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/8/8e/The_Legend_of_Zelda_Ocarina_of_Time_box_art.png', 
			'https://upload.wikimedia.org/wikipedia/en/b/b1/Contra_III_game_cover.png', 
			'http://starmen.net/mother2/images/official/ebBox.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/9/9b/SNES_F-Zero_boxart.jpg', 
			'http://static.giantbomb.com/uploads/original/9/93770/2363812-snes_earthwormjim.jpg', 
			'http://ecx.images-amazon.com/images/I/512%2BC6LgkvL._SX385_.jpg', 
			"https://upload.wikimedia.org/wikipedia/en/9/9a/Yoshi's_Island_(Super_Mario_World_2)_box_art.jpg", 
			'http://static.giantbomb.com/uploads/original/9/93770/2364665-snes_tmnt4turtlesintime.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/c/c1/Dkc_snes_boxart.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/c/c3/DK_Country_2.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/c/cc/Dkc3_snes_boxart.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/f/f1/Mega_Man_X_Coverart.png', 
			'https://upload.wikimedia.org/wikipedia/en/8/89/SuperMarioRPGSNESCoverArtUS.jpg', 
			'http://ecx.images-amazon.com/images/I/51BC8Mv-x2L._SX385_.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Smetroidbox.jpg/250px-Smetroidbox.jpg', 
			'http://vignette4.wikia.nocookie.net/mario/images/8/86/Super_Mario_Kart_-_North_American_Cover.png/revision/latest?cb=20120612005722', 
			'http://images.gamenguide.com/data/images/full/7403/super-mario-world.jpg', 
			'http://ecx.images-amazon.com/images/I/513hbHV0T4L._SX385_.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/5/52/Star_Fox_SNES.jpg', 
			'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/SNS-WD-USA.gif/250px-SNS-WD-USA.gif', 
			'http://ecx.images-amazon.com/images/I/51nOnmOxOUL._SX385_.jpg'])
			var newbies = _.shuffle([
				'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRSdY-3n63aOnnlPaNB3P0I6eZ_lBUA4ZLLLimjQqXr0fydy_btyw', 
				'http://static.giantbomb.com/uploads/original/9/93770/2367699-a2600_frogger_2.jpg', 
				'http://static.giantbomb.com/uploads/original/9/93770/2367669-a2600_asteroids_au.jpg', 
				'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTLOz9Yl8fo00JDZR43V6acmpsf9ncH1b_kNJDbW4v36Rc0-nOI', 
				'http://ecx.images-amazon.com/images/I/6143M9T1B6L.jpg', 
				'http://ecx.images-amazon.com/images/I/51RuKFbjiEL.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/1/13/Pikmin_cover_art.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/3/38/Pikmin_2_Case.jpg', 
				'http://ecx.images-amazon.com/images/I/51D98VK2RWL.jpg', 
				'http://ecx.images-amazon.com/images/I/51TlJtJf6hL.jpg', 
				'http://ecx.images-amazon.com/images/I/51R06WW6A8L.jpg', 
				'http://ecx.images-amazon.com/images/I/51GXYSKK0GL.jpg', 
				'http://ecx.images-amazon.com/images/I/51sm9T0oDQL.jpg', 
				'http://ecx.images-amazon.com/images/I/61Q05FCGB9L.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/7/78/Super_mario_sunshine.jpg', 
				'http://ecx.images-amazon.com/images/I/51TRQA05HBL.jpg', 
				'http://ecx.images-amazon.com/images/I/51W8C95QDDL.jpg', 
				'http://ecx.images-amazon.com/images/I/51JVNG4P1DL.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/8/86/Sands_of_time_cover.jpg', 
				'http://www.nesfiles.com/NES/Super_Mario_Bros_3/Super_Mario_Bros_3_boxfront.jpg', 
				'http://ecx.images-amazon.com/images/I/51cWpNCgoBL.jpg', 
				'http://vignette1.wikia.nocookie.net/nintendo/images/3/3d/Super_Mario_Bros._(NA).png/revision/latest?cb=20120516222518&path-prefix=en', 
				'http://img.gamefaqs.net/box/0/9/6/22096_front.jpg', 
				'http://ecx.images-amazon.com/images/I/518G1QPNYEL.jpg', 
				'http://ecx.images-amazon.com/images/I/51TK9HNJ3PL.jpg', 
				'http://img.gamefaqs.net/box/7/2/5/14725_front.jpg', 
				'http://www.hardcoregaming101.net/tracing/contra.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/4/46/RC_Pro_Am_cover.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/f/f8/Excitebike_cover.jpg', 
				'http://ecx.images-amazon.com/images/I/51PQ8MJFQWL.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/b/b1/Kid_Icarus_NES_box_art.png', 
				'http://img.gamefaqs.net/box/8/3/7/21837_front.jpg', 
				'http://static.giantbomb.com/uploads/original/9/93770/2362059-nes_metalgear.jpg', 
				'http://static.giantbomb.com/uploads/original/9/93770/2361165-nes_battletoads.jpg', 
				'http://vignette2.wikia.nocookie.net/nintendo/images/f/f1/Dr._Mario_(NES)_(NA).png/revision/latest?cb=20121203224336&path-prefix=en', 
				'http://img.gamefaqs.net/box/1/0/9/23109_front.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/1/14/DuckHuntBox.jpg', 
				'http://img2.game-oldies.com/sites/default/files/packshots/nintendo-nes/tecmo-bowl-usa-rev-a.png', 
				'http://media.gamestats.com/gg/image/sc2ps2_box_org.jpg', 
				'http://vignette4.wikia.nocookie.net/jakanddaxter/images/8/82/Jak_3_front_cover_(EU).png/revision/latest?cb=20140609131246', 
				'https://upload.wikimedia.org/wikipedia/en/8/86/Sands_of_time_cover.jpg', 
				'http://ecx.images-amazon.com/images/I/51Ub6ocFiiL._SY355_.jpg', 
				'http://ecx.images-amazon.com/images/I/6142CATEDWL.jpg', 
				'http://ecx.images-amazon.com/images/I/51dOdVAk0zL.jpg', 
				'http://199.101.98.242/media/images/150565-God_of_War_(USA)-4.jpg', 
				'http://ecx.images-amazon.com/images/I/51-TFvrGFHL.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Ffxboxart.jpg/250px-Ffxboxart.jpg', 
				'http://ecx.images-amazon.com/images/I/51DJ5Y7GQQL.jpg', 
				'http://ecx.images-amazon.com/images/I/6139QD2Z3ZL._SX385_.jpg', 
				'http://www.rockstargames.com/sanandreas/image/FOB_pc.jpg', 
				'http://s.emuparadise.org/fup/up/150757-Kingdom_Hearts_(USA)-1.jpg', 
				'http://vignette4.wikia.nocookie.net/t__/images/3/3a/Shadow_and_the_Colossus_NTSC-U_Cover.jpg/revision/latest?cb=20130712213544&path-prefix=teamico', 
				'http://s.emuparadise.org/fup/up/150356-Kingdom_Hearts_II_(USA)-1.jpg', 
				'http://ecx.images-amazon.com/images/I/51dK733zicL.jpg', 
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXYsGoxS1AYfs9k0Y0e1_lIPzLOUA9pqF2B4zb-QtBNfliDsqd', 
				'http://www.rockstargames.com/sanandreas/image/FOB_pc.jpg', 
				'http://images.pushsquare.com/games/ps3/bioshock/cover_large.jpg', 
				'http://cdn.slashgear.com/wp-content/uploads/2013/04/Heavy-Rain-proves-experimental-games-arent-always-unprofitable.jpg', 
				'http://ecx.images-amazon.com/images/I/A1Er5NlA3eL._SL1500_.jpg', 
				'http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/89/58/8958c60628ed93a1467fbfea19d38ad9.jpg?itok=ysvemxgY', 
				'https://d8kyhhndkm363.cloudfront.net/8/224240/936fulllittlebigplanet2cover.jpg', 
				'http://vignette1.wikia.nocookie.net/metalgear/images/b/be/MGS4_PS3_2D_FOB_psd_jpgcopy.jpg/revision/latest?cb=20120812155146&path-prefix=es', 
				'http://ecx.images-amazon.com/images/I/A1dXfW1yPNL._SL1500_.jpg', 
				'http://ecx.images-amazon.com/images/I/A1Zd014LSTS._SL1500_.jpg', 
				'http://images2.wikia.nocookie.net/__cb20111218032555/uncharted/images/0/02/Uncharted_3_Boxart.jpg', 
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXYsGoxS1AYfs9k0Y0e1_lIPzLOUA9pqF2B4zb-QtBNfliDsqd', 
				'http://charlieintel.com/wp-content/uploads/2015/04/image1.jpg', 
				'http://images.pushsquare.com/games/ps4/bloodborne/cover_large.jpg', 
				'http://images.esellerpro.com/2365/I/183/85/PS4WI01.jpg', 
				'http://images.pushsquare.com/news/2015/03/yes_metal_gear_solid_v_the_phantom_pain_sneaks_to_ps4_ps3_on_1st_september/attachment/1/large.jpg', 
				'http://ecx.images-amazon.com/images/I/81GjYy3kF1L._SL1500_.jpg', 
				'http://www.gengame.net/wp-content/gallery/watch_dogs-box-art/watch-dogs-ps3-boxart.jpg', 
				'http://s1.thcdn.com/productimg/0/600/600/99/10958799-1424770017-724172.jpg', 
				'http://www.lightninggamingnews.com/wp-content/gallery/fresh-screenshots-box-art-and-trailer-for-supermassives-until-dawn/Fresh-screenshots-box-art-and-trailer-for-Supermassive%E2%80%99s-Until-Dawn-9.jpg', 
				'http://www.gamingbus.com/wp-content/uploads/2012/10/Phantasy-Star-IV.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/8/80/Gunstar_Heroes.jpg', 
				'http://ecx.images-amazon.com/images/I/51u4Tbrv%2B1L.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/e/ea/Contra_-_Hard_Corps_Coverart.png', 
				'http://img2.game-oldies.com/sites/default/files/packshots/sega-genesis/altered-beast-usa-europe.png', 
				'http://img1.game-oldies.com/sites/default/files/packshots/sega-genesis/toe-jam-earl-world-rev-a.png', 
				'http://img2.game-oldies.com/sites/default/files/packshots/sega-genesis/double-dragon-v-the-shadow-falls-usa.png', 
				'https://upload.wikimedia.org/wikipedia/en/1/16/The_Lion_King_Coverart.png', 
				'http://img1.game-oldies.com/sites/default/files/packshots/sega-genesis/battletoads-double-dragon-usa.png', 
				'http://img1.game-oldies.com/sites/default/files/packshots/sega-genesis/golden-axe-world-v1-1.png', 
				'http://ecx.images-amazon.com/images/I/513sM13zpBL.jpg', 
				'http://img2.game-oldies.com/sites/default/files/packshots/sega-genesis/nba-jam-tournament-edition-world.png', 
				'https://upload.wikimedia.org/wikipedia/en/a/a3/Streets_Of_Rage_2_-EUR-.PNG', 
				'http://ecx.images-amazon.com/images/I/511SKY9ZY8L.jpg', 
				'http://img.gamefaqs.net/box/5/7/1/21571_front.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/0/07/Sonic3-box-us-225.jpg', 
				'http://gamesdbase.com/Media/SYSTEM/Sega_Genesis/Box/big/Super_Street_Fighter_II_-_The_New_Challengers_-_1994_-_Capcom_Co.,_Ltd..jpg', 
				'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/PanzerDragoonSagaBox.jpg/250px-PanzerDragoonSagaBox.jpg', 
				'http://www.hardcoregaming101.net/virtuafighter/virtuafighter2saturne.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/GH_front_cover.jpg/250px-GH_front_cover.jpg', 
				'http://www.hardcoregaming101.net/nights/saturn-cover.jpg', 
				'http://img.gamefaqs.net/box/0/4/3/7043_front.jpg', 
				'http://img.gamefaqs.net/box/6/7/8/8678_front.jpg', 
				'http://ecx.images-amazon.com/images/I/61AK%2BemUxdL.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Astal_Coverart.png/230px-Astal_Coverart.png', 
				'http://ecx.images-amazon.com/images/I/51CPSZYQy7L.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/b/b6/Sonic_R.jpg', 
				'http://ecx.images-amazon.com/images/I/519LgOv9z7L.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/0/04/Punch-Out!!.jpg', 
				'http://wiimedia.ign.com/wii/image/object/748/748589/TwilightPrincessRatingTFinalBox.jpg', 
				'http://ecx.images-amazon.com/images/I/61hsaXfwE3L.jpg', 
				'http://media.ign.com/games/image/object/748/748547/MetroidPrime3Corruption_Wii_US_Trated.jpg', 
				'http://vignette1.wikia.nocookie.net/geekyest-geeks/images/6/6b/MKW.png/revision/latest?cb=20150415120707', 
				'http://pcmedia.ign.com/pc/image/object/075/075624/sonic_colors_wii_esrb.jpg', 
				'http://ps3media.ign.com/ps3/image/object/143/14354707/donkeykongcuontryreturns.jpg', 
				'http://pcmedia.ign.com/pc/image/object/872/872155/skyward_sword_wii_final1.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/8/8f/NewSuperMarioBrosWiiBoxart.png', 
				'http://wiimedia.ign.com/wii/image/object/748/748588/MarioGalaxyFinalBox.jpg', 
				'http://ecx.images-amazon.com/images/I/81iCVhLDJFL._SL1500_.jpg', 
				'http://www.gamestop.com/common/images/lbox/917584bm.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/e/e0/Wii_Sports_Europe.jpg', 
				'http://www.mariowiki.com/images/thumb/5/56/Box_NA_-_Mario_Kart_8.jpg/250px-Box_NA_-_Mario_Kart_8.jpg', 
				'http://www.gamestop.com/common/images/lbox/111959b1.jpg', 
				'https://sickr.files.wordpress.com/2015/02/splatoon_us_box_art.jpg', 
				'http://ecx.images-amazon.com/images/I/51dtJVp2BjL._AC_UL320_SR224,320_.jpg', 
				'http://www.mariowiki.com/images/thumb/e/e2/Box_NA_-_Super_Mario_3D_World.png/250px-Box_NA_-_Super_Mario_3D_World.png', 
				'http://i2.wp.com/shoryuken.com/wp-content/uploads/2014/06/WiiU_SuperSmashBros_pkg.png', 
				'http://farm9.staticflickr.com/8126/8657462745_05cf3f76ee_o.jpg', 
				'https://senseofrightalliance.files.wordpress.com/2015/03/zombiu-box.jpg', 
				'http://images.vg247.com/current//2012/09/nintendo-land-boxart.jpg', 
				'http://louis-denizet.fr/wp-content/uploads/2014/05/soul-calibur-ii-4e260dad44be1.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/8/86/Sands_of_time_cover.jpg', 
				'http://www.rockstargames.com/sanandreas/image/FOB_pc.jpg', 
				'http://xboxmedia.ign.com/xbox/image/object/482/482119/doom3xboxbox.jpg', 
				'http://img.gamefaqs.net/box/4/3/0/14430_front.jpg', 
				'https://upload.wikimedia.org/wikipedia/en/3/3f/Conker_-_Live_%26_Reloaded_Coverart.png', 
				'http://media.gamestats.com/gg/image/needforspeeduxbox_org.jpg', 
				'http://ecx.images-amazon.com/images/I/71E9UxOXovL.gif',  
				'http://ecx.images-amazon.com/images/I/515NVQBw61L._AC_UL320_SR224,320_.jpg', 
				'http://ecx.images-amazon.com/images/I/517TWAB6W6L.jpg', 
				'http://static1.gamespot.com/uploads/scale_medium/mig/0/3/8/5/2210385-box_fable.png', 
				'https://upload.wikimedia.org/wikipedia/en/2/23/Project_Gotham_Racing_2_Coverart.png', 
				'http://img.gamefaqs.net/box/1/0/6/54106_front.jpg', 
				'http://www.lukiegames.com/assets/images/XBOX/xbox_halo-110214.jpg', 
				'http://ecx.images-amazon.com/images/I/51AXK29H5BL.jpg', 
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXYsGoxS1AYfs9k0Y0e1_lIPzLOUA9pqF2B4zb-QtBNfliDsqd', 
				'http://www.rockstargames.com/sanandreas/image/FOB_pc.jpg', 
				'http://ecx.images-amazon.com/images/I/71KEygwJ6aL._SL1081_.jpg', 
				'http://vignette3.wikia.nocookie.net/blurgame/images/9/93/Blur_Cover_Xbox360.jpg/revision/latest?cb=20100528195348', 
				'http://ecx.images-amazon.com/images/I/51cKx1N2jRL.jpg', 
				'http://static.giantbomb.com/uploads/original/8/87790/1789576-360_gow2.jpg', 
				'http://www.gigabytesistemas.com/images/productos/xbox-360-gears-of-war-3-1-5146.jpeg', 
				'http://ps2media.ign.com/ps2/image/object/850/850816/burnout_paradise_xbox360.jpg', 
				'http://ecx.images-amazon.com/images/I/91gJTd3RMJL._SL1500_.jpg', 
				'http://old.gamegrin.com/files/images/games/p/portal_2/standard_PORTAL_3_Boxart_NA_Xbox_360.png', 
				'http://www.mobygames.com/images/covers/l/297114-the-elder-scrolls-v-skyrim-xbox-360-front-cover.jpg', 
				'http://media.ign.com/games/image/object/143/14320288/red_dead_redemption_360.jpg', 
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXYsGoxS1AYfs9k0Y0e1_lIPzLOUA9pqF2B4zb-QtBNfliDsqd', 
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXYsGoxS1AYfs9k0Y0e1_lIPzLOUA9pqF2B4zb-QtBNfliDsqd', 
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXYsGoxS1AYfs9k0Y0e1_lIPzLOUA9pqF2B4zb-QtBNfliDsqd', 
				'http://gearnuke.com/wp-content/uploads/2013/08/PC-Xbox-360-and-Xbox-One-Box-Art-of-Titanfall-2.jpg', 
				'http://cdn.gamerant.com/wp-content/uploads/Fallout-4-Box-Art.jpg', 
				'http://img.game.co.uk/ml2/2/6/2/6/262620_xb1_b.png', 
				'http://ecx.images-amazon.com/images/I/71unMhOsM-L._SX425_.jpg', 
				'http://www.mobygames.com/images/covers/l/309800-destiny-limited-edition-xbox-one-front-cover.jpg', 
				'http://master.usfine.biz/upload/userfiles/images/20150725/1437808152_Oscar%20Will%20Share%20FIFA%2016%20Cover%20with%20Messi%20in%20Brazilian%20-%20XBOX%20ONE.jpg', 
				'http://images.purexbox.com/games/xbox-one/forza_motorsport_6/cover_large.jpg', 
				'http://s2.thcdn.com/productimg/600/600/11121020-1554301773570251.jpg', 
				'http://www.eggplante.com/wp-content/uploads/2013/10/Battlefield-4-Xbox-One-Box-Art.jpg', 
				'http://www.gamestop.com/common/images/lbox/210036b.jpg', 
				'http://ecx.images-amazon.com/images/I/51jL2oBgc4L.jpg', 
				'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4_mMQDX_ssZLqogsbauKZGIvCsXB-HxRBN_wBx3i-Iz124RGm'
				])
			$scope.classics = classics
			$scope.newbies = newbies




			// MODALS MODALS MODALS
			// For logging in
			$scope.showLogin = function(ev) {
				$mdDialog.show({
					controller: loginController,
					templateUrl: '../../html/cust/modals/login.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
			    })
			};



			// For top charts
			$scope.showTopItem = function(ev, item) {
				$scope.thisItem = item
				console.log($scope)
				console.log($scope.thisItem)
				
				// This code make the modal full screen on small devices
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
				// This code right here

			  
			// Using locals to pass an object into the dialog
			$mdDialog.show({
				locals:{thisItem: $scope.thisItem},
			    controller: topItemController,
			    templateUrl: '../../html/cust/modals/topitem.html',
			    parent: angular.element(document.body),
			    targetEvent: ev,
			    clickOutsideToClose:true,
			    fullscreen: useFullScreen
			})



			$scope.$watch(function() {
					return $mdMedia('xs') || $mdMedia('sm');
				}, function(wantsFullScreen) {
			    	$scope.customFullscreen = (wantsFullScreen === true);
			  	});

			};

			// Controllers for MODALS MODALS MODALS
			// Injected this item to give me access to it on modal
			function topItemController($scope, $mdDialog, thisItem) {

			// Make thisItem available on the modal
			$scope.thisItem = thisItem

			$scope.hide = function() {
			    $mdDialog.hide();
			};

			$scope.cancel = function() {
			    $mdDialog.cancel();
			};

			$scope.addToCart = function(item) {
				if (!$rootScope.user.cart){
					$rootScope.user.cart = {}
				}

				var cart = $rootScope.user.cart

				if(cart[item._id]) {
					cart[item._id] += 1
				} else {
					cart[item._id] = 1
				}

				console.log(cart)
				$http({
					method : 'POST',
					url    : '/api/addToCart',
					data   : cart,
				}).then(function(returnData){
					console.log(returnData.data)
				})
			}

			}

			function loginController($scope, $rootScope, $mdDialog) {
			  $scope.hide = function() {
			    $mdDialog.hide();
			  };

			  $scope.cancel = function() {
			    $mdDialog.cancel();
			  };

	  		// Login and SignUp
	  		$scope.signup = function(){
	  			console.log('sign up before AJAX')
	              $http({
	                  method : 'POST',
	                  url    : '/signup',
	                  data   : $scope.signupForm
	              }).then(function(returnData){
	                  console.log(returnData)
	                  if ( returnData.data.success ) { window.location.href="/#/" }
	              })
	          }

	          $scope.login = function(){
	              $http({
	                  method : 'POST',
	                  url    : '/login',
	                  data   : $scope.loginForm
	              }).then(function(returnData){
	              		console.log(returnData)
	                  if ( returnData.data.user ) {
	                  	$rootScope.user = returnData.data.user;
	                 	$rootScope.currentUserSignedIn = true;

	              		console.log($scope.user)
	              		console.log($rootScope.currentUserSignedIn)
	              		console.log($rootScope.currentUserSignedIn)

	              		$mdDialog.hide();
	              	}

	                  else { console.log(returnData)}
	              })
	          }

			}

			// End controller MODALS MODALS MODALS

			// Add to Cart
			$scope.orderBox = true;

			$scope.basket = []
			$scope.orderItem = {}
			$scope.total = 0

			$scope.addToOrder = function(item){
				$scope.thisItem = item
				console.log($scope)
				console.log($scope.thisItem)
			}

			// Total Price
			$scope.totalPrice = function() {
			$scope.total = 0
			for (var i=0; i < $scope.basket.length; i++) {
				$scope.total += $scope.basket[i].price;
			}
				console.log($scope.total);
				return $scope.total;
			}



		}])

angular
	.module('cust')
		.controller('console', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			console.log($routeParams)

			inventory.getConsolesList().then(function(returnData){
				$scope.consolesList = returnData.data
				console.log($scope.consolesList)
				})	
			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
					console.log($scope.gamesList)
				})	

			if($scope.$routeParams.console){
			$scope.activeConsole = _.find($scope.consolesList, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item._id === $scope.$routeParams.console

			})}

			if($scope.$routeParams.console){
			$scope.gameList = _.filter($scope.gamesList, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item.console.indexOf($scope.$routeParams.console) > -1

			})}

			console.log($scope.gamesList)

			// console.log($scope)
			// console.log($scope.activeConsole)
			// console.log($scope.gamesLibrary)
			// console.log($scope.consoleLibrary)
			// console.log($scope.bundles)
		}])

angular
	.module('cust')
		.controller('game', ['$scope', 'inventory', '$route', '$routeParams', '$location', function($scope, inventory, $route, $routeParams, $location){

			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;

			console.log($routeParams)

			inventory.getGamesList().then(function(returnData){
					$scope.gamesList = returnData.data
					console.log($scope.gamesList)
				})	

			if($scope.$routeParams.game){
			$scope.activeGame = _.find($scope.gamesList, function(item){
				console.log(item)
				console.log($scope.$routeParams)
				return item.title === $scope.$routeParams.game

			})
			}
			console.log($scope.activeConsole)
			// console.log($scope.gamesLibrary)
			// console.log($scope.consoleLibrary)
			// console.log($scope.bundles)

			// Add to Cart
			$scope.orderBox = true;

			$scope.basket = []
			$scope.orderItem = {}
			$scope.total = 0

		}])