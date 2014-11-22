 
 var eatSound = new Audio(); //吞食音效
 eatSound.src = "eat.mp3";
 var bgMusic = new Audio(); //背景音效，开始后加载
 
 // global
 var WIDTH = 20, //网格宽度
 HEIGHT = 11, //网格高度
 len, //蛇的长度
 speed, //爬行速度
 gridElems = multiArray(WIDTH,HEIGHT), //单元格对象
 carrier, //承载对象(食物，障碍，滑板，刹车)
 snake, //蛇每节的坐标点
 snakeTimer, //蛇行走计时器
 tailCorners, //按下转向键后，记录坐标，用于蛇尾的转向判定
 tailDirect = "", //尾巴的方向class
 appIcon, //食物
 willDirectkey, //最新按下的方向键，多次按下方向键，记录最后一个
 directkey; // 方向键值 37-40 左上右下，蛇最终走的方向键
 $(function() {
   document.onkeydown = attachEvents; //绑定方向事件
   $("#btnStart").on("click", function() {
    $("#stageBegin").fadeOut(500, function() {
      $("#stageComfirm").fadeIn(500);
    });
   });
   $("#btnConfirm").on("click", function() {
       $("#stageComfirm").fadeOut(500, function() {
         $("#stageReady").fadeIn(500, function() {
           $(this).fadeOut(500, function() {
             $("#stageGo").fadeIn(800, function() {
               $(this).fadeOut(500, function() {
                 initGrid(); //网格初始化
                 start(); //游戏开始
                 $("#stageGame").fadeIn(500, function() {})
               });
             });
           });
         });
       });
   });
 });
 //开始游戏
 function start() {
   len = 4;
   speed = 10;
   willDirectkey = 39;
   directkey = willDirectkey;
   tailDirect = "cover tail-1-right";
   appIcon = [
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/2bc8e8e7-0e95-461f-9990-ac4bfd1c7467",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0b719e4ebb1dd4fb207982307e7a9658b3b18d6ec",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/709bdf6a-8207-4030-ae87-1feee136404b",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/e0f799a0-5d6e-4bff-9ca9-c4282d4aa164",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/30507560-db8c-4158-aad7-e5949a33d944",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/cd69c1ff-aa36-4b1e-8e8f-10479ee9fb9c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/ed1c05c5-6e1f-4710-b51b-280034eba5a8",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/57df2797-0fb1-4c59-97b5-1e14f8f4300f",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/1f872c65-abb4-46af-a088-32373769034f",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/df897147-1a3e-4e36-b95f-dd3f8c468368",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/19dbbb11-7f90-4fb9-bbab-1a3bb6611e7a",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/54c8b5ac-f55a-4658-ba0f-2723fefd12ad",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/91f6a132-2e15-4496-89a3-d4a8dde8f272",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/fc125b9a-df81-4e66-93d3-119342e2e6d1",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/66f8b520-0e0f-4685-826d-9684fb0a5fb5",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/6ae31240-ce1e-46d2-8f5a-abe1f4b2b3a2",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/56835d44-78fe-4403-9dba-40424e5f64fc",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/761d6114-0234-4daf-8305-2bf4f0e29945",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/caff86a5-b077-4790-9011-c55925c6b513",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/bba3eb5f-1b44-4686-86d7-ae5f1e801d1c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/b9a66b88-1f6d-4db5-bc04-4c203947f92b",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/3a10f2f2-70e0-419b-bb69-432c66539767",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/15a44a4c-fc9f-4ca1-84f4-9c652f6383c9",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/2f353a57-dfbf-4c3a-ac6b-75af1144dff9",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/c4c69b3b-e697-4b60-910c-3ec333331d01",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/80e8b02e-f79e-4a74-9631-2d6739af9154",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/27477ea4-06de-4195-a2f5-ee4866ad32ed",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/1008b134-fe2d-44d9-8091-ec4c59d94e68",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/8076426e-5386-43eb-8d05-0f1d7f8a1618",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/45f1ff0a-7a0d-4711-bba7-a49ebea122bf",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/64951f03-add8-4ad6-bf42-4b3c5ff9a1b3",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/ed57dd90-c671-47f5-9b21-b5fbd2276136",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/11dbd58b-1afa-4b70-87d1-c9fc508f5429",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0c6be9a3-0d32-434e-a68e-0ef947a3c8cc",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/9dc42e5d-3d77-4a74-85d9-20f45a37f95a",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/f371b21c-c609-45f5-a8fb-cf1d15efd278",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/7f357102-656f-4cce-9942-b378d4c66560",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/7d8699c6-3a38-4ddf-8476-3fb2550c7b95",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/dc268789-6cb8-4d18-98ac-b5585dd76db8",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/34712e95-8f42-49df-9050-4f9c5ca570bf",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/d7b1f75f-2ff5-4a88-97ee-c985f6236d1c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/aa46e03f-e621-45df-8667-ffeea3245b77",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0feb5019-f8c5-45af-aedd-df9f204538e9",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0ed1a4b2ea67c8f8d99b4ed5a542a7a7c0440b19b",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/009bc64b2916b4a42292a6326fd138b2210d38234",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/6b0db3ab-d05b-419a-8dcd-7f43d5524c9d",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/5f6e8b9a-b0ad-431b-9e85-4b55bcb1cce9",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/7b33bb49-c469-41f8-bf6b-73ab83ec8508",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/6ca58d4b-e7d7-4ba8-8eca-35b18fc19595",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/a8807b83-469c-4c3a-b70e-311fc84001ce",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/628eb63d-14a7-4e18-8b68-ad32541fcce6",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/d2ecc168-db79-464c-aa20-271bb3ae9780",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/2f205d54-5a1e-442f-97b5-994cc7537d4c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/28bf8096-0cfa-4557-9b8b-e0cc426a6380",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/c6f75ed0-2450-41b3-8c6e-58f689aef553",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/17a8e8d9-d2e2-4f43-9565-419d3261484f",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/9cdeea4f-4203-46db-899f-08f0c536b5a7",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/3c543cec-88e0-47b7-a858-97e2991b8039",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/b28ffcdd-d1b7-4bea-bc20-a397c3de2d3c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/03727468272fc3d89d60b9083d6469a69f34194e7",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/b6fcbf7e-596c-4615-830d-f1f8773b1491",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/5faa6e2a-c3ab-4eea-a0e1-86ac196521d8",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/af6b3130-b620-43ee-9ee4-94d8c43701f0",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/cc5ecc0c-4f54-4567-b5e6-6c87946a8e41",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/d5bf820f-0a13-4f06-8a6e-4684085d087a",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/71c03d9c-cd68-4812-a6f8-329fc03727a4",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0dbdb45ceef6e45cb0f8ad19f958245b6da0c14b1",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0ebe65040fbf9fabb9c7cd1ba7e617ae511433767",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/79cbd45a-35c0-4035-8288-605e5adf7116",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/3009da21-f56a-4806-b262-ed91e2bbc708",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/55af4483-b8db-452f-a862-e0bb4f5cf272",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0af2e1ae-e535-43ea-89b4-76dfcddcdbd0",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/a28b0791-b0d3-4e7c-b419-45e91255cc88",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/4f97cfe8-940c-4280-af24-1958c6851c23",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/1c51962e-bcff-425b-b31a-a5005a3133c0",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/07decc69-b22d-48a5-b31f-a773f6d47df9",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/361190aa-a2d5-4245-8db0-aa5dd3bdcc1c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/19e7ff1a-92b5-49f3-bb48-a99b87a88e1c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/a3105490-b8fd-40dc-92ba-def41bde91c7",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/1a0ab3f5-02e4-429d-8ae7-77d0275b3445",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/907d30f8-4b51-47a3-9f76-3e1249dbe151",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/bad7734e-6c9a-4cfc-88b4-ad1028e09eb4",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0fbaad55cef9448da3036acbcca1f37fc5cd4daaa",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/2aa4e4cd-a37b-4eca-acd3-9f39309b1db4",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/90442865-abcf-4f1a-b36a-527583a36a2c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/53c135c1-2691-4a52-84e4-528d1c71b068",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/3b1fc7f6-8466-4e8a-8cf5-b76c07b63111",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/63aeaf78-f57b-4e2a-b9c8-cc38fb48b38f",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/e7faf3e7-90b9-4802-b58b-8847e3e1880f",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/5f4fb824-b2bb-4550-bfb8-246a2d14f1ad",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/3ba09cf4-cabc-4b67-b193-7259b18feb78",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0675ae4a8453d46ba3c3ea1a64d634a35b7bac735",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/e1f6444a-e2f9-4724-9b39-bb453de671b5",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/96c4401a-1a7a-447c-b445-05fa22e8ee5c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/1f565fc8-d6a3-4407-a34f-dde72570a6aa",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/143e0f5b-d04e-4133-a9c0-52ccf76b5432",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/d78af26e-662d-4064-87c9-78f28fbffe67",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0ec87e9c-24cd-4fb8-8b61-e904d527c46e",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0aab074197f9048040bf754cf4220c54174cb37f2",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/ce09dcf1-345b-45d0-b09b-e1e8789d62e6",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/ecf1c652-72aa-4990-94ff-cb62327651ef",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/97e0c45b-3304-4d7d-b409-0dfaa66bf712",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/5367db99-8174-43f9-be28-58c27720c743",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/66afa291-363d-4386-a279-5da3f6706f4f",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/c9cfeabf-48b6-40f1-a9de-d820cc08eb27",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/668bf262-7e18-41e2-a660-8ef5b32705c7",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/b7538e9c-3e71-4d08-b87e-c34d6cf2e6be",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/180c0b57-faaf-4489-b769-0b68a64fddb6",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/2a031e7d-27e3-40eb-8159-b020aa343f95",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/544d0baa-9d35-4c31-be61-29821ece31bb",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/01cf075e12ab546e424695d2ba539d56210936376",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/d4b4e94b-a488-4378-88ac-c454604338be",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/28c9581f-4734-4a43-9054-ad1a5e92fb41",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/362a7303-894b-4911-bf4b-ef75fa12cad8",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/af1e81eb-44ca-4d8d-92f6-eed81c9ae10c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/8869da40-ecc6-4492-936b-100127d7b90c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/431aabd2-1133-4d51-8de6-9fe52f4c81d1",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/62fc3d46-a848-4d86-a324-79e98041b8c8",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/52a/e1d37827fa79df1da26cfb7e5563567df0fc1b35",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/025d420b-d0f7-4aa9-8a58-62217b14366c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/74ee8412-741c-440d-a828-f4a47b45474a",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/6876e1b1-fced-450e-8794-a9bd6e378b2d",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/812cdc84-cc0a-4d69-9778-9ac6730f491b",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/cd7ec133-74b4-4469-b6f2-a7de80a5e14b",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/014308490e2ac4d9c1b634c0d9a5570185bb5b006",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/5ada6e60-2e10-4e16-8745-ff6e4f35db6c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/9fe0a628-69fb-43ca-8e38-c3e35e9a462a",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/929ca5b6-3c02-4bcb-aed5-a0c35ae9e1cc",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/0fe5025f-437d-4ddf-b6b7-247bd8add0cf",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/d3ae65cb-d203-4497-809c-8ab97907f655",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/f490c6d2-f1dc-4fde-857c-851b1f68110b",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/da24eb8b-4b0f-4b1c-ab43-a7e770f4cf33",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/23a0af21-a5b5-4db7-92ed-db2b5061cbbc",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/03b8642fc961d89aae633018435226ab3c3424087",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/a016783c-9f89-4f05-bde5-9bafa11dff2b",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/96845653-6889-423f-945f-bc7467762986",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/29bfbac1-50ae-425f-a784-01af431da09c",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/b3154a16-d5f3-497a-a604-29c4c469b594",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/801de0b8-217e-45f2-94ba-6e7337d748ff",
  "http://file.market.xiaomi.com/thumbnail/PNG/l50/AppStore/1250f575-3d50-44d1-afab-8edd5e2a16c2"
   ];
   tailCorners = [];
   carrier = multiArray(WIDTH,HEIGHT);
   snake = new Array();
   clear();
   initSnake(); //蛇初始化
   addObject("food");
   walk();
   bgMusic.src = "bg.WAV";
   bgMusic.loop = true;
   bgMusic.play();
 }
 //创建网格
 function initGrid() {
   var table = document.createElement("table"),
     tbody = document.createElement("tbody");
   for(var j = 0; j < HEIGHT; j++) {  
     var col = document.createElement("tr");  
     for(var i = 0; i < WIDTH; i++) {  
       var row = document.createElement("td");
       gridElems[i][j] = col.appendChild(row);  
     }
     tbody.appendChild(col);  
   }
   table.appendChild(tbody);
   $("#snakeWrap").append(table);
 }
 //创建蛇
 function initSnake() {
   var pointer = randomPointer(len-1, len-1, WIDTH/2);
   for(var i = 0; i < len; i++) {
     var x = pointer[0] - i,
       y = pointer[1];
     snake.push([x,y]);
     carrier[x][y] = "cover";
   }
 }
 //添加键盘事件
 function attachEvents(e) {
   e = e || event;
   willDirectkey = Math.abs(e.keyCode - directkey) != 2 && e.keyCode > 36 && e.keyCode < 41 ? e.keyCode : directkey; //非方向键、反向无效
   return false;
 }
 function walk() {
   if(snakeTimer) window.clearInterval(snakeTimer);
   snakeTimer = window.setInterval(step, Math.floor(3000/speed));
 }
 function step() {
   directkey = willDirectkey;
   var tailCorner = {
     "coord": snake[0][0] + "" + snake[0][1],
     "directkey": directkey
   };
   tailCorners.push(tailCorner);
   //获取目标点
   var headX = snake[0][0],
     headY = snake[0][1];
   switch(directkey) {
     case 37: headX -= 1; break;
     case 38: headY -= 1; break;
     case 39: headX += 1; break
     case 40: headY += 1; break;
   }
   //碰到边界，阻挡物，则结束游戏
   if(headX >= WIDTH || headX < 0 || headY >= HEIGHT || headY < 0 || carrier[headX][headY] == "cover" ) {
     window.clearInterval(snakeTimer);
     var scoreResult = len - 4;
     var rankResult = "0%";
     $("#score").text(scoreResult);
     switch(true) {
       case scoreResult < 5:
       rankResult = "5%";
       break;
       case 5 <= scoreResult < 20:
       rankResult = "20%";
       break;
       case 20 <= scoreResult < 30:
       rankResult = "60%";
       break;
       case 30 <= scoreResult < 50:
       rankResult = "99%";
       break;
       default:
       break;
     }
     $("#rank").text(rankResult);
     $("#stageShare").fadeIn(500);
     bgMusic.pause();
     return;
   }
   //加速
   if(len % 4 == 0 && speed < 60 && carrier[headX][headY] == "food") {
     speed += 5;
     walk(); 
   }
   //吃东西
   if(carrier[headX][headY] != "food") {
     var lastX = snake[snake.length-1][0],
       lastY = snake[snake.length-1][1];
     carrier[lastX][lastY] = false;
     gridElems[lastX][lastY].className = "";
     snake.pop();
   } else {
     carrier[headX][headY] = false;
     gridElems[headX][headY].innerHTML = "";
     eatSound.play();
     addObject("food");
   }
   snake.unshift([headX,headY]);
   carrier[headX][headY] = "cover";
   
   for(var i = 0, ii = snake.length; i < ii; i++) {
     var x = snake[i][0];
     var y = snake[i][1];
     gridElems[x][y].className = "cover";
     if(i == 0) {
       switch(directkey) {
         case 37: gridElems[x][y].className = "cover header-left"; break;
         case 38: gridElems[x][y].className = "cover header-up"; break;
         case 39: gridElems[x][y].className = "cover header-right"; break
         case 40: gridElems[x][y].className = "cover header-down"; break;
       }
     }
 
     if(i == ii - 3) {
       gridElems[x][y].className = "cover tail-3";
     }
     if(i == ii - 2) {
       gridElems[x][y].className = "cover tail-2";
     }
     if(i == ii - 1) {
       if(tailCorners.length > 0 && x + "" + y == tailCorners[0].coord) {
         switch(tailCorners[0].directkey) {
           case 37: tailDirect = "cover tail-1-left"; break;
           case 38: tailDirect = "cover tail-1-up"; break;
           case 39: tailDirect = "cover tail-1-right"; break
           case 40: tailDirect = "cover tail-1-down"; break;
         }
         tailCorners.shift();
       }
       gridElems[x][y].className = tailDirect;
     }
   }
   len = snake.length;
 }
 //添加物品
 function addObject(name) {
   var p = randomPointer();
   carrier[p[0]][p[1]] = name;
   gridElems[p[0]][p[1]].className = name;
   var iconUrl = appIcon.splice(Math.round(appIcon.length * Math.random()), 1);
   var $img = $("<img width='48' style='display:none' heigth='48' src=" + iconUrl +">");
   $(gridElems[p[0]][p[1]]).append($img);
   $img.fadeIn(500);
 }
 //创建二维数组
 function multiArray(m,n) {
   var arr =  new Array(m);
   for(var i=0, ii = arr.length; i < ii; i++) 
     arr[i] = new Array(n);
   return arr;
 }
 //清除画面
 function clear() {
   for(var x = 0; x < gridElems.length; x++) {
     for(var y = 0; y < gridElems[x].length; y++) {
       gridElems[x][y].className = "";
       gridElems[x][y].innerHTML = "";
     }
   }
 }
 //产生指定范围随机点
 function randomPointer(startX,startY,endX,endY) {
   startX = startX || 0;
   startY = startY || 0;
   endX = endX || WIDTH;
   endY = endY || HEIGHT;
   var p = [],
     x = Math.floor(Math.random()*(endX - startX)) + startX,
     y = Math.floor(Math.random()*(endY - startY)) + startY;
   if(carrier[x][y]) return randomPointer(startX,startY,endX,endY);
   p[0] = x;
   p[1] = y;
   return p;
 }
 
 $("#btnReplay").on("click", function() {
   $("#stageShare").fadeOut(500);
   start();
 });