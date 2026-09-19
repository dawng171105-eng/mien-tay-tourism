import "dotenv/config";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Article from "./models/Article.js";
import Tour from "./models/Tour.js";
import Hotel from "./models/Hotel.js";

const PROVINCES = [
  "An Giang",
  "Bạc Liêu",
  "Bến Tre",
  "Cà Mau",
  "Cần Thơ",
  "Đồng Tháp",
  "Hậu Giang",
  "Kiên Giang",
  "Long An",
  "Sóc Trăng",
  "Tiền Giang",
  "Trà Vinh",
  "Vĩnh Long",
];

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    Article.deleteMany(),
    Tour.deleteMany(),
    Hotel.deleteMany(),
  ]);

  const admin = await User.create({
    name: "Quản Trị Viên",
    email: "admin@mientay.vn",
    password: "admin123",
    role: "admin",
    phone: "0901000000",
  });

  const customer = await User.create({
    name: "Đỗ Nhựt Đăng",
    email: "customer@mientay.vn",
    password: "123456",
    role: "customer",
    phone: "0902000000",
  });

  const articles = [
    {
      title: "Chợ nổi Cái Răng - Biểu tượng sông nước Cần Thơ",
      content:
        "Chợ nổi Cái Răng là một trong những chợ nổi lớn nhất miền Tây, hoạt động từ sáng sớm trên sông Cần Thơ. Du khách có thể thưởng thức hủ tiếu, cà phê trên ghe và mua sắm trái cây đặc sản.",
      province: "Cần Thơ",
      category: "dia-danh",
      coverImage:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      author: admin._id,
    },
    {
      title: "Lẩu mắm U Minh - Hương vị đậm đà miền Tây",
      content:
        "Lẩu mắm là món ăn đặc trưng với nước dùng từ mắm cá linh, kết hợp rau nhút, bông điên điển, cá lóc và ba khía. Đây là trải nghiệm ẩm thực không thể bỏ qua khi đến Cà Mau.",
      province: "Cà Mau",
      category: "am-thuc",
      coverImage:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      author: admin._id,
    },
    {
      title: "Lễ hội Chol Chnam Thmay tại An Giang",
      content:
        "Lễ hội Chol Chnam Thmay của đồng bào Khmer diễn ra vào tháng 4, đánh dấu năm mới theo lịch Khmer với các nghi lễ tắm Phật, dựng cây nêu và múa lân.",
      province: "An Giang",
      category: "le-hoi",
      coverImage:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      author: admin._id,
    },
    {
      title: "Vườn trái cây Cái Bè - Tiền Giang",
      content:
        "Du lịch vườn trái Cái Bè cho phép thưởng thức trái cây tươi ngay tại vườn, đi xuồng ba lá và nghe nhạc đờn ca tài tử.",
      province: "Tiền Giang",
      category: "dia-danh",
      coverImage:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      author: admin._id,
    },
    {
      title: "Bánh pía Sóc Trăng - Đặc sản ngọt ngào",
      content:
        "Bánh pía nhân sầu riêng, đậu xanh là quà lưu niệm nổi tiếng của Sóc Trăng, mang hương vị hòa quyện giữa vị ngọt và béo.",
      province: "Sóc Trăng",
      category: "am-thuc",
      coverImage:
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      author: admin._id,
    },
  ];

  await Article.insertMany(articles);

  const now = new Date();

  const tours = [];

  // ==================== AN GIANG (10 TOURS) ====================
  tours.push({
    name: "Tour An Giang 3 Ngày 2 Đêm: Sinh Thái Tràm Trà Sư & Văn Hóa Khmer",
    description:
      "Trải nghiệm toàn diện An Giang: khám phá rừng tràm nguyên sinh, thăm các ngôi chùa Khmer cổ kính, và thưởng thức ẩm thực đặc trưng.",
    itinerary: `Ngày 1:
05:30 - Đón khách tại điểm gặp mặt (Cần Thơ/Sài Gòn)
06:00 - Khởi hành đi An Giang (khoảng 2 tiếng)
08:00 - Ăn sáng tại nhà hàng địa phương: bánh mì trứng pate, cà phê sữa đá
09:00 - Đi đến Rừng Tràm Trà Sư, tham quan hệ sinh thái rừng tràm ngập nước
09:30 - Đi xuồng len lỏi qua các rạch, nghe hướng dẫn viên giải thích về động thực vật
11:00 - Tham quan tháp quan sát, chụp ảnh toàn cảnh rừng tràm
11:30 - Ăn trưa tại nhà hàng ven rừng: cá lóc nướng măng, canh chua cá basa, rau muống xào tỏi, cơm trắng
13:00 - Khởi hành đi Châu Đốc (khoảng 45 phút)
13:45 - Tham quan Chợ Châu Đốc, mua sắm đặc sản: mắm tôm, rượu mận, bánh tráng nướng
15:30 - Đến Miếu Bà Chúa Xứ, tìm hiểu lịch sử và truyền thuyết
16:30 - Đến khách sạn, nhận phòng, nghỉ ngơi
18:00 - Ăn tối tại nhà hàng: gỏi tôm thịt, lẩu cá basa, mực nướng măng, canh khổ qua nhồi thịt
20:00 - Tự do đi dạo phố đêm Châu Đốc, thưởng thức bánh trôi nước, chè đậu đỏ

Ngày 2:
06:30 - Thức dậy, ăn sáng: phở bò, bánh cuốn, trà đá
07:30 - Đi Núi Sam (khoảng 20 phút)
08:00 - Đi bộ lên đỉnh Núi Sam, thăm Chùa Hang, Chùa Ông
09:30 - Chụp ảnh toàn cảnh Châu Đốc từ trên núi
10:00 - Xuống núi, tham quan Làng Nghề Đệt Chiếu
10:30 - Học cách làm chiếu thủ công cùng người dân địa phương
11:30 - Ăn trưa: bún nước lèo, bánh xèo tôm thịt, canh chua cá lóc
13:00 - Tham quan Chùa Khmer Wat Pothivong, tìm hiểu kiến trúc và văn hóa Khmer
14:30 - Tham quan Vườn Trái Cây An Giang, thưởng thức trái cây tươi tại vườn (măng cụt, dừa, rambutan)
16:30 - Về khách sạn, nghỉ ngơi, tự do
18:00 - Ăn tối: cơm rang tôm, ốc xào tỏi, canh cải bẹ nấu tôm
20:00 - Tự do

Ngày 3:
06:30 - Ăn sáng
07:30 - Tham quan Chợ nổi Phong Điền (nếu có, tuỳ theo mùa nước)
09:30 - Mua sắm quà lưu niệm
11:00 - Ăn trưa
12:30 - Khởi hành về Cần Thơ/Sài Gòn
14:30 - Trả khách tại điểm gặp mặt`,
    province: "An Giang",
    price: 2800000,
    duration: "3 ngày 2 đêm",
    maxSlots: 20,
    availableSlots: 20,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 19),
    ],
  });

  tours.push({
    name: "Tour An Giang 2 Ngày 1 Đêm: Tâm Linh Núi Sam & Miếu Bà Chúa Xứ",
    description:
      "Trải nghiệm tâm linh và khám phá thiên nhiên Núi Sam, thăm miếu nổi tiếng và chùa Khmer.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:00 - Đi Núi Sam, thăm Chùa Hang, Chùa Ông
11:00 - Ăn trưa tại nhà hàng trên núi
12:30 - Đi Miếu Bà Chúa Xứ, thực hiện nghi thức cầu nguyện
14:30 - Tham quan Chùa Khmer Wat Pothivong
16:00 - Về khách sạn ở Châu Đốc, nghỉ ngơi
18:00 - Ăn tối đặc sản địa phương
20:00 - Đi dạo phố đêm Châu Đốc

Ngày 2:
06:30 - Ăn sáng
07:30 - Đi Rừng Tràm Trà Sư, đi xuồng khám phá
11:00 - Ăn trưa
13:00 - Khởi hành về Cần Thơ
15:00 - Trả khách`,
    province: "An Giang",
    price: 1800000,
    duration: "2 ngày 1 đêm",
    maxSlots: 25,
    availableSlots: 25,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21),
    ],
  });

  tours.push({
    name: "Tour An Giang 1 Ngày: Khám Phá Rừng Tràm Trà Sư & Chợ Châu Đốc",
    description:
      "1 ngày khám phá rừng tràm và chợ nổi Châu Đốc, thưởng thức ẩm thực đặc trưng.",
    itinerary:
      "06:30 - Đón khách\n09:00 - Đến Rừng Tràm Trà Sư, đi xuồng khám phá\n11:30 - Ăn trưa\n13:00 - Tham quan Chợ Châu Đốc\n15:00 - Đến Miếu Bà Chúa Xứ\n16:30 - Khởi hành về Cần Thơ\n18:30 - Trả khách",
    province: "An Giang",
    price: 950000,
    duration: "1 ngày",
    maxSlots: 30,
    availableSlots: 30,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 24),
    ],
  });

  tours.push({
    name: "Tour An Giang 1 Ngày: Văn Hóa Khmer & Làng Nghề Đệt Chiếu",
    description:
      "Tìm hiểu văn hóa Khmer và các làng nghề truyền thống của An Giang.",
    itinerary:
      "07:00 - Đón khách\n09:00 - Thăm Chùa Khmer Wat Pothivong\n11:00 - Ăn trưa\n12:30 - Tham quan Làng Nghề Đệt Chiếu, học làm chiếu\n14:30 - Tham quan Vườn Trái Cây\n16:00 - Khởi hành về Cần Thơ\n18:00 - Trả khách",
    province: "An Giang",
    price: 850000,
    duration: "1 ngày",
    maxSlots: 35,
    availableSlots: 35,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 26),
    ],
  });







  // ==================== BẠC LIÊU (9 TOURS) ====================
  tours.push({
    name: "Tour Bạc Liêu 3 Ngày 2 Đêm: Nhà Công Tử & Cánh Đồng Điện Gió",
    description:
      "Khám phá lịch sử Nhà Công Tử, cánh đồng điện gió và bãi biển tuyệt đẹp.",
    itinerary: `Ngày 1:
06:30 - Đón khách
09:30 - Đến Nhà Công Tử Bạc Liêu, tham quan kiến trúc cổ điển
12:00 - Ăn trưa đặc sản: bún riêu cua, gỏi cá
13:30 - Đến khách sạn, nghỉ ngơi
15:00 - Đi Cánh Đồng Điện Gió, chụp ảnh với các tuabin khổng lồ
17:00 - Đi Bãi biển Bạc Liêu, bơi lội, ngắm hoàng hôn
18:30 - Ăn tối hải sản tươi ngon
20:00 - Tự do

Ngày 2:
07:30 - Ăn sáng
08:30 - Đi thuyền khám phá rừng đước
11:30 - Ăn trưa
13:00 - Tham quan làng nghề làm mắm
16:00 - Về khách sạn
18:30 - Ăn tối
20:00 - Đi dạo bãi biển đêm

Ngày 3:
07:30 - Ăn sáng
08:30 - Tham quan Chợ Bạc Liêu
10:30 - Mua sắm đặc sản
12:00 - Ăn trưa
13:30 - Khởi hành về Cần Thơ
16:30 - Trả khách`,
    province: "Bạc Liêu",
    price: 2500000,
    duration: "3 ngày 2 đêm",
    maxSlots: 20,
    availableSlots: 20,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 22),
    ],
  });

  tours.push({
    name: "Tour Bạc Liêu 2 Ngày 1 Đêm: Nhà Công Tử & Bãi Biển",
    description: "Khám phá lịch sử và cảnh quan tuyệt đẹp Bạc Liêu.",
    itinerary: `Ngày 1:
07:00 - Đón khách
10:00 - Tham quan Nhà Công Tử Bạc Liêu
12:00 - Ăn trưa
13:30 - Đến khách sạn
15:00 - Đi Cánh Đồng Điện Gió
17:00 - Đi Bãi biển, bơi lội
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Tham quan Chợ Bạc Liêu
10:30 - Thăm làng nghề làm mắm
12:00 - Ăn trưa
13:30 - Khởi hành về Cần Thơ
16:30 - Trả khách`,
    province: "Bạc Liêu",
    price: 1600000,
    duration: "2 ngày 1 đêm",
    maxSlots: 25,
    availableSlots: 25,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 26),
    ],
  });

  tours.push({
    name: "Tour Bạc Liêu 1 Ngày: Nhà Công Tử & Cánh Đồng Điện Gió",
    description: "Trải nghiệm 1 ngày khám phá Bạc Liêu.",
    itinerary:
      "07:00 - Đón khách\n10:00 - Tham quan Nhà Công Tử\n12:00 - Ăn trưa\n13:30 - Đi Cánh Đồng Điện Gió\n15:30 - Khởi hành về Cần Thơ\n18:30 - Trả khách",
    province: "Bạc Liêu",
    price: 850000,
    duration: "1 ngày",
    maxSlots: 30,
    availableSlots: 30,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28),
    ],
  });

  tours.push({
    name: "Tour Bạc Liêu 1 Ngày: Ẩm Thực & Đặc Sản",
    description: "Khám phá ẩm thực và đặc sản Bạc Liêu.",
    itinerary:
      "07:30 - Đón khách\n10:30 - Tham quan Chợ Bạc Liêu\n12:00 - Ăn trưa: bún riêu cua, gỏi cá, ốc xào\n13:30 - Thăm làng nghề làm mắm\n15:30 - Khởi hành về Cần Thơ\n18:00 - Trả khách",
    province: "Bạc Liêu",
    price: 800000,
    duration: "1 ngày",
    maxSlots: 35,
    availableSlots: 35,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 16),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30),
    ],
  });






  // ==================== BẾN TRE (10 TOURS) ====================
  tours.push({
    name: "Tour Bến Tre 3 Ngày 2 Đêm: Xứ Dừa Sâu Sắc & Đờn Ca Tài Tử",
    description:
      "Trải nghiệm đầy đủ văn hóa xứ dừa, làng nghề, sinh thái miệt vườn và nhạc đờn ca tài tử.",
    itinerary: `Ngày 1:
07:00 - Đón khách
08:30 - Đi Bến Tre (khoảng 1 tiếng)
09:00 - Đi xuồng ba lá khám phá rạch dừa
10:30 - Thăm Lò kẹo dừa, học làm kẹo dừa
11:30 - Thăm Lò bánh tráng, tự làm bánh tráng
12:00 - Ăn trưa: cá nướng măng, canh chua dừa, bánh xèo, cơm trắng
13:30 - Đến khách sạn, nghỉ ngơi
15:00 - Thăm Vườn trái cây (dừa, măng cụt, rambutan), thưởng thức tại vườn
17:00 - Nghe đờn ca tài tử tại nhà dân
18:30 - Ăn tối
20:00 - Tự do

Ngày 2:
06:30 - Ăn sáng
07:30 - Đi thuyền đến Chợ nổi Cái Bè
09:30 - Tham quan chợ nổi, ăn sáng trên thuyền
11:00 - Thăm Làng nghề làm mũ cói
12:00 - Ăn trưa
13:00 - Tham quan làng dừa cổ xưa
15:30 - Về khách sạn
18:30 - Ăn tối
20:00 - Tự do

Ngày 3:
07:30 - Ăn sáng
08:30 - Tham quan Làng Du Lịch Mỹ Lợi
10:00 - Tham gia hoạt động dân gian: đua heo, xiếc khỉ
11:00 - Ăn trưa
13:00 - Khởi hành về Cần Thơ
14:30 - Trả khách`,
    province: "Bến Tre",
    price: 2200000,
    duration: "3 ngày 2 đêm",
    maxSlots: 25,
    availableSlots: 25,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
    ],
  });

  tours.push({
    name: "Tour Bến Tre 2 Ngày 1 Đêm: Xứ Dừa & Làng Nghề",
    description:
      "Trải nghiệm văn hóa xứ dừa và các làng nghề truyền thống Bến Tre.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:00 - Đi xuồng ba lá khám phá rạch dừa
10:30 - Thăm lò kẹo dừa, lò bánh tráng
12:00 - Ăn trưa
13:30 - Đến khách sạn
15:00 - Thăm vườn trái cây
17:00 - Nghe đờn ca tài tử
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Đi Chợ nổi Cái Bè
10:30 - Thăm làng nghề làm mũ cói
12:00 - Ăn trưa
13:30 - Khởi hành về Cần Thơ
15:00 - Trả khách`,
    province: "Bến Tre",
    price: 1400000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 24),
    ],
  });

  tours.push({
    name: "Tour Bến Tre 1 Ngày: Khám Phá Xứ Dừa & Chợ Nổi",
    description: "1 ngày khám phá xứ dừa và chợ nổi Cái Bè.",
    itinerary:
      "07:00 - Đón khách\n09:00 - Đi xuồng ba lá khám phá rạch dừa\n10:30 - Thăm lò kẹo dừa, bánh tráng\n12:00 - Ăn trưa\n13:30 - Thăm vườn trái cây\n15:30 - Khởi hành về Cần Thơ\n17:00 - Trả khách",
    province: "Bến Tre",
    price: 700000,
    duration: "1 ngày",
    maxSlots: 40,
    availableSlots: 40,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 27),
    ],
  });

  tours.push({
    name: "Tour Bến Tre 1 Ngày: Ẩm Thực Dừa & Đờn Ca Tài Tử",
    description:
      "Trải nghiệm ẩm thực dừa và nhạc đờn ca tài tử đặc trưng Bến Tre.",
    itinerary:
      "08:00 - Đón khách\n10:00 - Thăm lò kẹo dừa, thưởng thức kẹo dừa\n12:00 - Ăn trưa: canh chua dừa, cá nướng măng dừa, bánh xèo\n13:30 - Nghe đờn ca tài tử\n15:30 - Khởi hành về Cần Thơ\n17:00 - Trả khách",
    province: "Bến Tre",
    price: 750000,
    duration: "1 ngày",
    maxSlots: 35,
    availableSlots: 35,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 29),
    ],
  });







  // ==================== CẦN THƠ (10 TOURS) ====================
  tours.push({
    name: "Tour Cần Thơ 3 Ngày 2 Đêm: Toàn Diện Thủ Đô Miền Tây",
    description:
      "Khám phá mọi khía cạnh Cần Thơ: chợ nổi, làng nghề, văn hóa và sinh thái.",
    itinerary: `Ngày 1:
05:30 - Đón khách
06:00 - Đi Chợ nổi Cái Răng, ăn sáng trên thuyền (hủ tiếu, bánh cuốn)
08:00 - Thăm Làng nghề làm kẹo dừa, hủ tiếu
10:00 - Đi Làng Du Lịch Mỹ Khánh
11:30 - Ăn trưa
13:00 - Tham gia hoạt động: đua heo, xiếc khỉ, câu cá sấu
16:00 - Đến khách sạn, nghỉ ngơi
17:30 - Đi thuyền ngắm hoàng hôn trên sông Hậu
18:30 - Ăn tối
20:00 - Đi dạo phố đêm Ninh Kiều, thưởng thức ẩm thực đường phố

Ngày 2:
06:30 - Ăn sáng
07:30 - Tham quan Thiền Viện Trúc Lâm Phương Nam
09:30 - Thăm Nhà thờ Chính Tòa, Bưu điện cổ
11:30 - Ăn trưa
13:00 - Đi Vườn Cò Bằng Lăng
15:00 - Tham quan Bảo tàng Cần Thơ
17:00 - Về khách sạn
18:30 - Ăn tối

Ngày 3:
07:30 - Ăn sáng
08:30 - Tham quan Vườn Trái Cây Thốt Nốt
11:00 - Ăn trưa
13:00 - Thăm làng nghề làm bánh tráng
15:00 - Mua sắm đặc sản
16:30 - Trả khách`,
    province: "Cần Thơ",
    price: 2500000,
    duration: "3 ngày 2 đêm",
    maxSlots: 25,
    availableSlots: 25,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 18),
    ],
  });

  tours.push({
    name: "Tour Cần Thơ 2 Ngày 1 Đêm: Chợ Nổi & Làng Du Lịch Mỹ Khánh",
    description: "Khám phá chợ nổi và làng du lịch Mỹ Khánh.",
    itinerary: `Ngày 1:
05:30 - Đón khách
06:00 - Đi Chợ nổi Cái Răng
08:00 - Thăm làng nghề
10:00 - Đi Làng Du Lịch Mỹ Khánh
12:00 - Ăn trưa
13:30 - Tham gia hoạt động
16:00 - Đến khách sạn
18:30 - Ăn tối
20:00 - Phố đêm Ninh Kiều

Ngày 2:
07:30 - Ăn sáng
08:30 - Thiền Viện Trúc Lâm
10:30 - Vườn Cò Bằng Lăng
12:00 - Ăn trưa
14:00 - Về điểm khởi hành
15:30 - Trả khách`,
    province: "Cần Thơ",
    price: 1800000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: true,
    images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=800"],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21),
    ],
  });

  tours.push({
    name: "Tour Cần Thơ 1 Ngày: Chợ Nổi Cái Răng & Vườn Cò Bằng Lăng",
    description: "1 ngày khám phá Cần Thơ.",
    itinerary:
      "05:30 - Đón khách\n06:00 - Đi Chợ nổi Cái Răng\n08:00 - Ăn sáng\n09:30 - Đi Vườn Cò Bằng Lăng\n11:30 - Ăn trưa\n13:00 - Thăm làng nghề\n15:00 - Về điểm khởi hành\n16:30 - Trả khách",
    province: "Cần Thơ",
    price: 750000,
    duration: "1 ngày",
    maxSlots: 30,
    availableSlots: 30,
    featured: false,
    images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=800"],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 24),
    ],
  });

  tours.push({
    name: "Tour Cần Thơ 1 Ngày: Ẩm Thực Đặc Trưng Miền Tây",
    description:
      "Khám phá ẩm thực miền Tây đặc trưng: hủ tiếu, lẩu mắm, bánh xèo...",
    itinerary:
      "08:00 - Đón khách\n09:00 - Ăn sáng: hủ tiếu Nam Vang\n11:30 - Ăn trưa: lẩu mắm, cá nướng măng, bánh xèo\n14:30 - Thưởng thức bánh pía, kẹo dừa\n16:30 - Ăn nhẹ: bánh xèo, chè\n18:00 - Trả khách",
    province: "Cần Thơ",
    price: 850000,
    duration: "10 tiếng",
    maxSlots: 15,
    availableSlots: 15,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
    ],
  });







  // ==================== CÀ MAU (9 TOURS) ====================
  tours.push({
    name: "Tour Cà Mau 4 Ngày 3 Đêm: Đất Mũi & Vườn Quốc Gia U Minh Hạ",
    description:
      "Khám phá điểm cực Nam Việt Nam và hệ sinh thái rừng tràm U Minh Hạ.",
    itinerary: `Ngày 1:
05:30 - Đón khách
06:00 - Khởi hành đi Cà Mau (khoảng 4 tiếng)
10:00 - Ăn trưa tại thành phố Cà Mau
11:30 - Đi Đất Mũi (khoảng 1,5 tiếng)
13:00 - Tham quan Mốc tọa độ Quốc gia, Cột cờ Đất Mũi
15:30 - Đi thuyền quanh vùng
17:00 - Ăn tối tại Đất Mũi
18:30 - Ngắm hoàng hôn
19:30 - Về thành phố Cà Mau, nhận phòng khách sạn

Ngày 2:
06:30 - Ăn sáng
07:30 - Đi Vườn Quốc Gia U Minh Hạ
09:00 - Đi xuồng xuyên rừng tràm
12:00 - Ăn trưa: lẩu mắm đặc sản
13:30 - Tham gia câu cá, thăm hộ dân trong rừng
16:00 - Về khách sạn
18:00 - Ăn tối

Ngày 3:
07:30 - Ăn sáng
08:30 - Tham quan Vườn Đất Mũi
11:00 - Ăn trưa
13:00 - Đi thuyền khám phá sông Cà Mau
16:00 - Về khách sạn
18:30 - Ăn tối

Ngày 4:
07:30 - Ăn sáng
08:30 - Tham quan Chợ Cà Mau, mua sắm đặc sản
10:30 - Ăn sáng nhẹ
11:00 - Khởi hành về Cần Thơ
15:00 - Trả khách`,
    province: "Cà Mau",
    price: 3800000,
    duration: "4 ngày 3 đêm",
    maxSlots: 15,
    availableSlots: 15,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 24),
    ],
  });

  tours.push({
    name: "Tour Cà Mau 3 Ngày 2 Đêm: Đất Mũi & U Minh Hạ",
    description: "Khám phá điểm cực Nam và rừng tràm U Minh Hạ.",
    itinerary: `Ngày 1:
06:00 - Đón khách
10:30 - Đến Cà Mau, ăn trưa
12:00 - Đi Đất Mũi
13:30 - Tham quan Đất Mũi
17:00 - Ăn tối
18:30 - Về thành phố Cà Mau, khách sạn

Ngày 2:
06:30 - Ăn sáng
07:30 - Đi Vườn Quốc Gia U Minh Hạ
09:00 - Đi xuồng xuyên rừng
12:00 - Ăn trưa
13:30 - Hoạt động tại U Minh
16:00 - Về khách sạn
18:00 - Ăn tối

Ngày 3:
07:30 - Ăn sáng
08:30 - Tham quan Chợ Cà Mau
10:30 - Khởi hành về
14:30 - Trả khách`,
    province: "Cà Mau",
    price: 3200000,
    duration: "3 ngày 2 đêm",
    maxSlots: 18,
    availableSlots: 18,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 29),
    ],
  });

  tours.push({
    name: "Tour Cà Mau 2 Ngày 1 Đêm: Đất Mũi & U Minh Hạ",
    description: "Trải nghiệm 2 ngày khám phá Cà Mau.",
    itinerary: `Ngày 1:
06:00 - Đón khách
10:30 - Đến Cà Mau, ăn trưa
12:00 - Đi Đất Mũi
13:30 - Tham quan Đất Mũi
17:00 - Ăn tối
18:30 - Về khách sạn

Ngày 2:
07:30 - Ăn sáng
08:30 - Đi U Minh Hạ
12:00 - Ăn trưa
14:00 - Khởi hành về Cần Thơ
18:00 - Trả khách`,
    province: "Cà Mau",
    price: 2200000,
    duration: "2 ngày 1 đêm",
    maxSlots: 22,
    availableSlots: 22,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 17),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 31),
    ],
  });

  tours.push({
    name: "Tour Cà Mau 1 Ngày: Ẩm Thực & Đặc Sản",
    description:
      "Khám phá ẩm thực và đặc sản Cà Mau: lẩu mắm, cá basa, mắm tôm...",
    itinerary:
      "07:00 - Đón khách\n11:00 - Đến Cà Mau\n12:00 - Ăn trưa lẩu mắm\n13:30 - Tham quan chợ Cà Mau\n15:00 - Khởi hành về Cần Thơ\n19:00 - Trả khách",
    province: "Cà Mau",
    price: 1200000,
    duration: "1 ngày",
    maxSlots: 28,
    availableSlots: 28,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 34),
    ],
  });






  // ==================== ĐỒNG THÁP (9 TOURS) ====================
  tours.push({
    name: "Tour Đồng Tháp 3 Ngày 2 Đêm: Sen Hồng Sa Đéc & Vườn Quốc Gia Tràm Chim",
    description:
      "Khám phá đồng sen hồng, làng hoa, văn hóa Sa Đéc và Vườn Quốc Gia Tràm Chim.",
    itinerary: `Ngày 1:
07:00 - Đón khách
08:30 - Đi Đồng Tháp (khoảng 1,5 tiếng)
09:00 - Thăm Làng hoa Sa Đéc
11:00 - Đi thuyền ngắm đồng sen (mùa sen)
12:00 - Ăn trưa: cá nướng măng, canh chua sen, cơm trắng
13:30 - Đến khách sạn
15:00 - Thăm Chùa Phước Kiển
17:00 - Thăm Làng nghề làm hoa giấy
18:30 - Ăn tối
20:00 - Tự do

Ngày 2:
07:30 - Ăn sáng
08:30 - Đi Vườn Quốc Gia Tràm Chim
11:00 - Ăn trưa
13:00 - Thăm vườn trái cây
15:30 - Về khách sạn
18:30 - Ăn tối

Ngày 3:
07:30 - Ăn sáng
08:30 - Tham quan Chợ Sa Đéc
10:30 - Mua sắm đặc sản: bánh tráng sen, kẹo sen
12:00 - Ăn trưa
13:30 - Khởi hành về Cần Thơ
15:00 - Trả khách`,
    province: "Đồng Tháp",
    price: 2300000,
    duration: "3 ngày 2 đêm",
    maxSlots: 25,
    availableSlots: 25,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21),
    ],
  });

  tours.push({
    name: "Tour Đồng Tháp 2 Ngày 1 Đêm: Sen Hồng Sa Đéc & Làng Hoa",
    description: "Khám phá đồng sen và làng hoa Sa Đéc.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:00 - Thăm Làng hoa Sa Đéc
11:00 - Đi thuyền ngắm sen
12:00 - Ăn trưa
13:30 - Đến khách sạn
15:00 - Thăm Chùa Phước Kiển
17:00 - Thăm làng nghề làm hoa giấy
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Tham quan Chợ Sa Đéc
10:30 - Thăm vườn trái cây
12:00 - Ăn trưa
13:30 - Khởi hành về Cần Thơ
15:00 - Trả khách`,
    province: "Đồng Tháp",
    price: 1500000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 9),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 23),
    ],
  });

  tours.push({
    name: "Tour Đồng Tháp 1 Ngày: Sen Hồng Sa Đéc",
    description: "1 ngày khám phá đồng sen và làng hoa Sa Đéc.",
    itinerary:
      "07:00 - Đón khách\n09:00 - Thăm Làng hoa Sa Đéc\n10:30 - Đi thuyền ngắm sen\n12:00 - Ăn trưa\n13:30 - Thăm Chùa Phước Kiển\n15:30 - Khởi hành về Cần Thơ\n17:00 - Trả khách",
    province: "Đồng Tháp",
    price: 720000,
    duration: "1 ngày",
    maxSlots: 35,
    availableSlots: 35,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 27),
    ],
  });

  tours.push({
    name: "Tour Đồng Tháp 3 Ngày 2 Đêm: Vườn Quốc Gia Tràm Chim & Sinh Thái",
    description:
      "Khám phá Vườn Quốc Gia Tràm Chim và hệ sinh thái Đồng Tháp Mười.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:00 - Đến Đồng Tháp
10:00 - Đi Vườn Quốc Gia Tràm Chim
12:30 - Ăn trưa
14:00 - Thăm khu vực sinh thái
17:00 - Đến khách sạn
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Thăm làng hoa Sa Đéc
11:00 - Ăn trưa
13:00 - Thăm làng nghề
16:00 - Về khách sạn
18:30 - Ăn tối

Ngày 3:
07:00 - Ăn sáng
08:30 - Tham quan chợ
10:30 - Mua sắm
12:00 - Ăn trưa
13:30 - Khởi hành về
15:00 - Trả khách`,
    province: "Đồng Tháp",
    price: 2500000,
    duration: "3 ngày 2 đêm",
    maxSlots: 20,
    availableSlots: 20,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 11),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 25),
    ],
  });






  // ==================== HẬU GIANG (8 TOURS) ====================
  tours.push({
    name: "Tour Hậu Giang 2 Ngày 1 Đêm: Sinh Thái & Làng Nghề",
    description:
      "Trải nghiệm khu du lịch sinh thái và các làng nghề truyền thống Hậu Giang.",
    itinerary: `Ngày 1:
07:30 - Đón khách
08:30 - Đi Hậu Giang
09:30 - Thăm vườn cây ăn trái, tát mương bắt cá
11:30 - Thưởng thức trái cây tại vườn
12:30 - Ăn trưa
14:00 - Tham gia trò chơi dân gian: đá gà, kéo co, cày nước
16:00 - Đến khách sạn
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Thăm làng nghề truyền thống
11:00 - Ăn trưa
13:00 - Khởi hành về Cần Thơ
14:30 - Trả khách`,
    province: "Hậu Giang",
    price: 1400000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 24),
    ],
  });

  tours.push({
    name: "Tour Hậu Giang 1 Ngày: Khu Du Lịch Sinh Thái & Vườn Trái Cây",
    description: "Trải nghiệm không gian yên bình tại Hậu Giang.",
    itinerary:
      "07:30 - Đón khách\n08:30 - Đi Hậu Giang\n09:30 - Thăm vườn cây ăn trái, tát mương bắt cá\n11:30 - Thưởng thức trái cây\n12:30 - Ăn trưa\n14:00 - Tham gia trò chơi dân gian\n15:30 - Khởi hành về Cần Thơ\n17:00 - Trả khách",
    province: "Hậu Giang",
    price: 680000,
    duration: "1 ngày",
    maxSlots: 35,
    availableSlots: 35,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 16),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30),
    ],
  });

  tours.push({
    name: "Tour Hậu Giang 2 Ngày 1 Đêm: Ẩm Thực & Cuộc Sống Sông Nước",
    description: "Trải nghiệm ẩm thực và cuộc sống sông nước Hậu Giang.",
    itinerary: `Ngày 1:
07:30 - Đón khách
09:00 - Đi thuyền khám phá sông Hậu
11:30 - Ăn trưa
13:30 - Thăm làng nghề
16:00 - Đến khách sạn
18:00 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Thăm vườn trái cây
11:00 - Ăn trưa
13:00 - Khởi hành về
14:30 - Trả khách`,
    province: "Hậu Giang",
    price: 1500000,
    duration: "2 ngày 1 đêm",
    maxSlots: 28,
    availableSlots: 28,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 26),
    ],
  });

  tours.push({
    name: "Tour Hậu Giang 1 Ngày: Tham Quan Làng Nghề & Chợ",
    description: "Thăm các làng nghề truyền thống và chợ địa phương Hậu Giang.",
    itinerary:
      "07:30 - Đón khách\n09:30 - Thăm làng nghề\n11:30 - Ăn trưa\n13:30 - Tham quan chợ\n15:30 - Khởi hành về\n17:00 - Trả khách",
    province: "Hậu Giang",
    price: 700000,
    duration: "1 ngày",
    maxSlots: 32,
    availableSlots: 32,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 18),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 32),
    ],
  });





  // ==================== KIÊN GIANG (10 TOURS) ====================
  tours.push({
    name: "Tour Kiên Giang 4 Ngày 3 Đêm: Phú Quốc & Đảo Nam Du",
    description: "Trải nghiệm 2 đảo tuyệt đẹp: Phú Quốc và Nam Du.",
    itinerary: `Ngày 1:
06:00 - Đón khách
06:30 - Đi Rạch Giá (khoảng 3 tiếng)
09:30 - Lên tàu đến Nam Du (khoảng 2,5 tiếng)
12:00 - Đến Nam Du, ăn trưa
13:00 - Nhận phòng khách sạn
14:30 - Đi bãi biển, bơi lội
17:30 - Ngắm hoàng hôn
18:30 - Ăn tối hải sản

Ngày 2:
06:30 - Ăn sáng
07:30 - Lên tàu tham quan các đảo nhỏ, lặn ngắm san hô và cá màu
12:00 - Ăn trưa trên đảo
14:00 - Về Nam Du, nghỉ ngơi
16:00 - Đi dạo bãi biển
18:30 - Ăn tối

Ngày 3:
06:30 - Ăn sáng
07:30 - Lên tàu về Rạch Giá
10:00 - Đi xe đến Phú Quốc
12:00 - Ăn trưa
13:30 - Nhận phòng khách sạn
15:00 - Tham quan Bãi Sao, bơi lội
17:30 - Ngắm hoàng hôn tại Dương Đông
18:30 - Ăn tối
20:00 - Đi Chợ đêm Dinh Cậu

Ngày 4:
06:30 - Ăn sáng
07:30 - Tham quan Vườn quốc gia Phú Quốc, Thánh địa Mũi Gánh Đầu
11:00 - Ăn trưa
12:30 - Thăm làng nghề sản xuất nước mắm
14:00 - Mua sắm đặc sản: mực khô, nước mắm Phú Quốc
15:30 - Khởi hành về Cần Thơ
19:00 - Trả khách`,
    province: "Kiên Giang",
    price: 5200000,
    duration: "4 ngày 3 đêm",
    maxSlots: 15,
    availableSlots: 15,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 26),
    ],
  });

  tours.push({
    name: "Tour Kiên Giang 3 Ngày 2 Đêm: Phú Quốc & Đảo Nam Du",
    description: "Trải nghiệm 2 đảo tuyệt đẹp.",
    itinerary: `Ngày 1:
06:00 - Đón khách
09:30 - Lên tàu đến Nam Du
12:00 - Đến Nam Du, ăn trưa
13:00 - Nhận phòng
14:30 - Đi bãi biển

Ngày 2:
06:30 - Ăn sáng
07:30 - Tham quan các đảo nhỏ, lặn ngắm san hô
12:00 - Ăn trưa
14:00 - Về Nam Du
18:30 - Ăn tối

Ngày 3:
06:30 - Ăn sáng
07:30 - Lên tàu về Rạch Giá
10:00 - Đi Phú Quốc
12:00 - Ăn trưa
13:30 - Tham quan Bãi Sao
16:00 - Khởi hành về
19:00 - Trả khách`,
    province: "Kiên Giang",
    price: 4500000,
    duration: "3 ngày 2 đêm",
    maxSlots: 18,
    availableSlots: 18,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 34),
    ],
  });

  tours.push({
    name: "Tour Kiên Giang 2 Ngày 1 Đêm: Phú Quốc",
    description: "Khám phá bãi biển và các điểm tham quan Phú Quốc.",
    itinerary: `Ngày 1:
06:00 - Đón khách
11:00 - Đến Phú Quốc, ăn trưa
12:30 - Nhận phòng khách sạn
14:00 - Đi Bãi Sao, bơi lội
17:30 - Ngắm hoàng hôn
18:30 - Ăn tối
20:00 - Đi Chợ đêm Dinh Cậu

Ngày 2:
06:30 - Ăn sáng
07:30 - Tham quan Vườn quốc gia, Thánh địa
11:00 - Ăn trưa
12:30 - Thăm làng nghề sản xuất nước mắm
14:00 - Mua sắm
15:30 - Khởi hành về Cần Thơ
19:00 - Trả khách`,
    province: "Kiên Giang",
    price: 3200000,
    duration: "2 ngày 1 đêm",
    maxSlots: 20,
    availableSlots: 20,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 18),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 32),
    ],
  });

  tours.push({
    name: "Tour Kiên Giang 1 Ngày: Đảo Nam Du (từ Rạch Giá)",
    description: "1 ngày khám phá Đảo Nam Du (từ Rạch Giá).",
    itinerary:
      "06:00 - Đón khách\n09:30 - Lên tàu đến Nam Du\n12:00 - Ăn trưa\n13:30 - Đi bãi biển, bơi lội\n16:00 - Lên tàu về Rạch Giá\n19:00 - Khởi hành về Cần Thơ\n21:00 - Trả khách",
    province: "Kiên Giang",
    price: 1800000,
    duration: "1 ngày",
    maxSlots: 25,
    availableSlots: 25,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 22),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 36),
    ],
  });





  // ==================== LONG AN (8 TOURS) ====================
  tours.push({
    name: "Tour Long An 2 Ngày 1 Đêm: Làng Cổ & Đồng Tháp Mười",
    description: "Khám phá kiến trúc cổ kính và hệ sinh thái Đồng Tháp Mười.",
    itinerary: `Ngày 1:
07:00 - Đón khách
08:30 - Đi Long An
09:00 - Thăm Làng Cổ Phước Lộc Thọ
11:30 - Ăn trưa
13:00 - Đến khách sạn
14:30 - Thăm Khu Du Lịch Sinh Thái Đồng Tháp Mười
17:00 - Tham gia làm nông
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Tham quan chợ Long An
09:30 - Thăm làng nghề làm rượu mận
11:30 - Ăn trưa
13:00 - Khởi hành về
14:30 - Trả khách`,
    province: "Long An",
    price: 1500000,
    duration: "2 ngày 1 đêm",
    maxSlots: 28,
    availableSlots: 28,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 11),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 25),
    ],
  });

  tours.push({
    name: "Tour Long An 1 Ngày: Làng Cổ & Đồng Tháp Mười",
    description: "1 ngày khám phá Long An.",
    itinerary:
      "07:00 - Đón khách\n09:00 - Thăm Làng Cổ Phước Lộc Thọ\n11:30 - Ăn trưa\n13:30 - Thăm Khu Du Lịch Sinh Thái\n15:30 - Khởi hành về\n17:00 - Trả khách",
    province: "Long An",
    price: 780000,
    duration: "1 ngày",
    maxSlots: 32,
    availableSlots: 32,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28),
    ],
  });

  tours.push({
    name: "Tour Long An 2 Ngày 1 Đêm: Ẩm Thực & Làng Nghề",
    description: "Trải nghiệm ẩm thực và làng nghề Long An.",
    itinerary: `Ngày 1:
07:30 - Đón khách
09:00 - Thăm làng nghề làm rượu mận
11:30 - Ăn trưa
13:00 - Đến khách sạn
14:30 - Thăm vườn trái cây
17:30 - Ăn tối

Ngày 2:
07:00 - Ăn sáng
08:30 - Tham quan chợ
10:30 - Mua sắm
12:00 - Ăn trưa
13:30 - Khởi hành về
15:00 - Trả khách`,
    province: "Long An",
    price: 1600000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 16),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30),
    ],
  });

  tours.push({
    name: "Tour Long An 3 Ngày 2 Đêm: Sinh Hoạt Cùng Người Dân",
    description: "Sinh hoạt cùng người dân Long An.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:30 - Đến homestay
10:30 - Tham gia làm nông
12:00 - Ăn trưa cùng gia đình
13:30 - Nghỉ ngơi
15:00 - Thăm Khu Du Lịch Sinh Thái
17:30 - Ăn tối
19:00 - Tự do

Ngày 2:
06:30 - Ăn sáng
07:30 - Tham gia thu hoạch
11:00 - Ăn trưa
13:00 - Thăm làng nghề
16:00 - Về homestay
18:00 - Ăn tối
20:00 - Tự do

Ngày 3:
07:00 - Ăn sáng
08:30 - Tham quan chợ
10:30 - Mua sắm
12:00 - Ăn trưa
13:30 - Khởi hành về
15:00 - Trả khách`,
    province: "Long An",
    price: 2100000,
    duration: "3 ngày 2 đêm",
    maxSlots: 15,
    availableSlots: 15,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 27),
    ],
  });





  // ==================== SÓC TRĂNG (9 TOURS) ====================
  tours.push({
    name: "Tour Sóc Trăng 3 Ngày 2 Đêm: Văn Hóa Khmer & Chùa Đôi",
    description: "Khám phá văn hóa Khmer và các ngôi chùa nổi tiếng Sóc Trăng.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:00 - Đi Sóc Trăng
09:30 - Thăm Chùa Đơi
11:30 - Ăn trưa
13:00 - Đến khách sạn
14:30 - Thăm Chùa Đất Sét
16:30 - Thăm các chùa Khmer khác
18:30 - Ăn tối
20:00 - Tự do

Ngày 2:
07:30 - Ăn sáng
08:30 - Tham quan chợ Sóc Trăng
09:30 - Thăm làng nghề dệt chiếu
11:30 - Ăn trưa
13:00 - Thăm Vườn Trái Cây Sóc Trăng
15:30 - Về khách sạn
18:30 - Ăn tối

Ngày 3:
07:30 - Ăn sáng
08:30 - Tham quan Lễ hội Chol Chnam Thmay (nếu đúng mùa)
10:30 - Mua sắm quà lưu niệm
12:00 - Ăn trưa
13:30 - Khởi hành về
15:30 - Trả khách`,
    province: "Sóc Trăng",
    price: 2400000,
    duration: "3 ngày 2 đêm",
    maxSlots: 25,
    availableSlots: 25,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 22),
    ],
  });

  tours.push({
    name: "Tour Sóc Trăng 2 Ngày 1 Đêm: Chùa Đôi & Văn Hóa Khmer",
    description: "Khám phá văn hóa Khmer và các ngôi chùa Sóc Trăng.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:30 - Thăm Chùa Đơi
11:30 - Ăn trưa
13:00 - Đến khách sạn
14:30 - Thăm Chùa Đất Sét
16:30 - Thăm các chùa Khmer khác
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Tham quan chợ Sóc Trăng
09:30 - Thăm làng nghề dệt chiếu
11:30 - Ăn trưa
13:30 - Khởi hành về
15:30 - Trả khách`,
    province: "Sóc Trăng",
    price: 1600000,
    duration: "2 ngày 1 đêm",
    maxSlots: 28,
    availableSlots: 28,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 26),
    ],
  });

  tours.push({
    name: "Tour Sóc Trăng 1 Ngày: Chùa Đôi & Chùa Khmer",
    description: "1 ngày khám phá Sóc Trăng.",
    itinerary:
      "07:00 - Đón khách\n09:30 - Thăm Chùa Đơi\n11:30 - Ăn trưa\n13:00 - Thăm Chùa Đất Sét\n15:30 - Khởi hành về\n17:30 - Trả khách",
    province: "Sóc Trăng",
    price: 780000,
    duration: "1 ngày",
    maxSlots: 32,
    availableSlots: 32,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 29),
    ],
  });

  tours.push({
    name: "Tour Sóc Trăng 2 Ngày 1 Đêm: Ẩm Thực & Bánh Pía",
    description: "Trải nghiệm ẩm thực và làm bánh pía Sóc Trăng.",
    itinerary: `Ngày 1:
07:30 - Đón khách
09:00 - Thăm làng nghề làm bánh pía, học làm bánh
11:30 - Ăn trưa
13:30 - Đến khách sạn
14:30 - Thăm Vườn Trái Cây
17:30 - Ăn tối

Ngày 2:
07:00 - Ăn sáng
08:30 - Thăm các chùa Khmer
11:00 - Ăn trưa
13:00 - Khởi hành về
15:00 - Trả khách`,
    province: "Sóc Trăng",
    price: 1700000,
    duration: "2 ngày 1 đêm",
    maxSlots: 26,
    availableSlots: 26,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28),
    ],
  });






  // ==================== TIỀN GIANG (10 TOURS) ====================
  tours.push({
    name: "Tour Tiền Giang 3 Ngày 2 Đêm: Mỹ Tho - Cồn Thới Sơn - Cái Bè",
    description: "Trải nghiệm đầy đủ du lịch miệt vườn Tiền Giang.",
    itinerary: `Ngày 1:
07:00 - Đón khách
08:30 - Đi Tiền Giang
09:00 - Đi xuồng ba lá đến Cồn Thới Sơn
10:30 - Thăm các vườn trái cây, nghe đờn ca tài tử
12:00 - Ăn trưa
13:30 - Thăm lò kẹo dừa, lò bánh tráng
15:00 - Đến khách sạn ở Mỹ Tho
17:00 - Đi dạo bờ sông Mỹ Tho
18:30 - Ăn tối
20:00 - Tự do

Ngày 2:
06:30 - Ăn sáng
07:30 - Đi thuyền đến Chợ nổi Cái Bè
09:30 - Tham quan chợ nổi, ăn sáng trên thuyền
11:00 - Thăm vườn trái cây Cái Bè
12:30 - Ăn trưa
14:00 - Thăm làng nghề truyền thống
16:00 - Về khách sạn
18:30 - Ăn tối

Ngày 3:
07:30 - Ăn sáng
08:30 - Thăm Chùa Vĩnh Tràng
10:30 - Mua sắm đặc sản
12:00 - Ăn trưa
13:30 - Khởi hành về
15:00 - Trả khách`,
    province: "Tiền Giang",
    price: 2100000,
    duration: "3 ngày 2 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
    ],
  });

  tours.push({
    name: "Tour Tiền Giang 2 Ngày 1 Đêm: Mỹ Tho - Cồn Thới Sơn - Cái Bè",
    description: "Trải nghiệm du lịch miệt vườn Tiền Giang.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:00 - Đi xuồng ba lá đến Cồn Thới Sơn
10:30 - Thăm vườn trái cây, nghe đờn ca tài tử
12:00 - Ăn trưa
13:30 - Thăm lò kẹo dừa, bánh tráng
15:00 - Đến khách sạn
17:00 - Đi dạo bờ sông
18:30 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Đi thuyền đến Chợ nổi Cái Bè
11:00 - Thăm vườn trái cây
12:30 - Ăn trưa
14:00 - Khởi hành về
15:30 - Trả khách`,
    province: "Tiền Giang",
    price: 1500000,
    duration: "2 ngày 1 đêm",
    maxSlots: 35,
    availableSlots: 35,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 24),
    ],
  });

  tours.push({
    name: "Tour Tiền Giang 1 Ngày: Cồn Thới Sơn & Cái Bè",
    description: "1 ngày khám phá Tiền Giang.",
    itinerary:
      "07:00 - Đón khách\n09:00 - Đi xuồng ba lá đến Cồn Thới Sơn\n10:30 - Thăm vườn trái cây\n12:00 - Ăn trưa\n13:30 - Đi thuyền đến Chợ nổi Cái Bè\n15:30 - Khởi hành về\n17:00 - Trả khách",
    province: "Tiền Giang",
    price: 780000,
    duration: "1 ngày",
    maxSlots: 35,
    availableSlots: 35,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 27),
    ],
  });

  tours.push({
    name: "Tour Tiền Giang 2 Ngày 1 Đêm: Ẩm Thực & Đờn Ca Tài Tử",
    description: "Trải nghiệm ẩm thực và nhạc đờn ca tài tử Tiền Giang.",
    itinerary: `Ngày 1:
07:30 - Đón khách
09:30 - Thăm lò kẹo dừa, bánh tráng
11:30 - Ăn trưa
13:30 - Nghe đờn ca tài tử
16:00 - Đến khách sạn
18:00 - Ăn tối

Ngày 2:
07:00 - Ăn sáng
08:30 - Đi thuyền đến Côn Thới Sơn
11:00 - Ăn trưa
13:00 - Khởi hành về
15:00 - Trả khách`,
    province: "Tiền Giang",
    price: 1600000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28),
    ],
  });







  // ==================== TRÀ VINH (8 TOURS) ====================
  tours.push({
    name: "Tour Trà Vinh 2 Ngày 1 Đêm: Chùa Âng & Ao Bà Om",
    description: "Khám phá văn hóa tâm linh và cảnh quan thiên nhiên Trà Vinh.",
    itinerary: `Ngày 1:
07:00 - Đón khách
08:30 - Đi Trà Vinh
09:00 - Thăm Chùa Âng
11:00 - Đi Ao Bà Om, thả lượn, chụp ảnh
12:00 - Ăn trưa
13:30 - Đến khách sạn
15:00 - Thăm Làng Nghề Dệt Chiếu
17:00 - Thăm các chùa Khmer khác
18:30 - Ăn tối
20:00 - Tự do

Ngày 2:
07:30 - Ăn sáng
08:30 - Tham quan chợ Trà Vinh
09:30 - Thăm Vườn cây ăn trái
11:30 - Ăn trưa
13:00 - Khởi hành về
14:30 - Trả khách`,
    province: "Trà Vinh",
    price: 1400000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 27),
    ],
  });

  tours.push({
    name: "Tour Trà Vinh 1 Ngày: Chùa Âng & Ao Bà Om",
    description: "1 ngày khám phá Trà Vinh.",
    itinerary:
      "07:00 - Đón khách\n09:00 - Thăm Chùa Âng\n11:00 - Đi Ao Bà Om\n12:00 - Ăn trưa\n13:30 - Thăm Làng Nghề Dệt Chiếu\n15:30 - Khởi hành về\n17:00 - Trả khách",
    province: "Trà Vinh",
    price: 700000,
    duration: "1 ngày",
    maxSlots: 35,
    availableSlots: 35,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 16),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30),
    ],
  });

  tours.push({
    name: "Tour Trà Vinh 2 Ngày 1 Đêm: Văn Hóa Khmer & Ẩm Thực",
    description: "Trải nghiệm văn hóa Khmer và ẩm thực Trà Vinh.",
    itinerary: `Ngày 1:
07:30 - Đón khách
09:00 - Thăm các chùa Khmer
11:30 - Ăn trưa
13:30 - Đến khách sạn
14:30 - Thăm làng nghề dệt chiếu
17:30 - Ăn tối

Ngày 2:
07:00 - Ăn sáng
08:30 - Đi Ao Bà Om
10:30 - Ăn trưa
13:00 - Khởi hành về
15:00 - Trả khách`,
    province: "Trà Vinh",
    price: 1500000,
    duration: "2 ngày 1 đêm",
    maxSlots: 28,
    availableSlots: 28,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 18),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 32),
    ],
  });

  tours.push({
    name: "Tour Trà Vinh 3 Ngày 2 Đêm: Sinh Hoạt Cùng Người Dân Khmer",
    description: "Sinh hoạt cùng người dân Khmer Trà Vinh.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:30 - Đến homestay
10:30 - Tham gia sinh hoạt
12:00 - Ăn trưa cùng gia đình
13:30 - Nghỉ ngơi
15:00 - Thăm Chùa Âng
17:30 - Ăn tối
19:00 - Nghe nhạc dân ca

Ngày 2:
06:30 - Ăn sáng
07:30 - Tham gia làm nông
11:00 - Ăn trưa
13:00 - Thăm làng nghề dệt chiếu
16:00 - Về homestay
18:00 - Ăn tối
20:00 - Tự do

Ngày 3:
07:00 - Ăn sáng
08:30 - Đi Ao Bà Om
10:30 - Ăn trưa
13:00 - Khởi hành về
15:00 - Trả khách`,
    province: "Trà Vinh",
    price: 2000000,
    duration: "3 ngày 2 đêm",
    maxSlots: 15,
    availableSlots: 15,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 29),
    ],
  });





  // ==================== VĨNH LONG (9 TOURS) ====================
  tours.push({
    name: "Tour Vĩnh Long 3 Ngày 2 Đêm: Chợ Nổi & Làng Gốm",
    description: "Trải nghiệm cuộc sống sông nước và nghề gốm truyền thống.",
    itinerary: `Ngày 1:
06:30 - Đón khách
07:00 - Đi Vĩnh Long
08:00 - Đi thuyền đến Chợ nổi Cái Bè
09:30 - Tham quan chợ nổi, ăn sáng trên thuyền
11:00 - Thăm vườn trái cây
12:30 - Ăn trưa trên thuyền
14:00 - Đến khách sạn
15:30 - Thăm Làng Gốm Bàu Mai
18:00 - Ăn tối
20:00 - Tự do

Ngày 2:
07:30 - Ăn sáng
08:30 - Thăm thành phố Vĩnh Long
10:30 - Thăm làng nghề khác
12:00 - Ăn trưa
13:30 - Đi thuyền khám phá sông
16:00 - Về khách sạn
18:30 - Ăn tối

Ngày 3:
07:30 - Ăn sáng
08:30 - Mua sắm đặc sản
10:30 - Ăn trưa
12:00 - Khởi hành về
13:30 - Trả khách`,
    province: "Vĩnh Long",
    price: 2000000,
    duration: "3 ngày 2 đêm",
    maxSlots: 28,
    availableSlots: 28,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 9),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 23),
    ],
  });

  tours.push({
    name: "Tour Vĩnh Long 2 Ngày 1 Đêm: Chợ Nổi Cái Bè & Làng Gốm",
    description: "Trải nghiệm chợ nổi và làng gốm Vĩnh Long.",
    itinerary: `Ngày 1:
06:30 - Đón khách
08:00 - Đi Chợ nổi Cái Bè
11:00 - Thăm vườn trái cây
12:30 - Ăn trưa
14:00 - Đến khách sạn
15:30 - Thăm Làng Gốm Bàu Mai
18:00 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Thăm thành phố
10:30 - Mua sắm
12:00 - Ăn trưa
13:30 - Khởi hành về
15:00 - Trả khách`,
    province: "Vĩnh Long",
    price: 1400000,
    duration: "2 ngày 1 đêm",
    maxSlots: 30,
    availableSlots: 30,
    featured: true,
    images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=800"],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 26),
    ],
  });

  tours.push({
    name: "Tour Vĩnh Long 1 Ngày: Chợ Nổi Cái Bè & Làng Gốm",
    description: "1 ngày khám phá Vĩnh Long.",
    itinerary:
      "06:30 - Đón khách\n08:00 - Đi Chợ nổi Cái Bè\n11:00 - Ăn trưa\n13:00 - Thăm Làng Gốm Bàu Mai\n15:30 - Khởi hành về\n17:00 - Trả khách",
    province: "Vĩnh Long",
    price: 800000,
    duration: "1 ngày",
    maxSlots: 30,
    availableSlots: 30,
    featured: false,
    images: ["https://images.unsplash.com/photo-1528127269322-539801943592?w=800"],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 28),
    ],
  });

  tours.push({
    name: "Tour Vĩnh Long 2 Ngày 1 Đêm: Ẩm Thực & Sông Nước",
    description: "Trải nghiệm ẩm thực và cuộc sống sông nước Vĩnh Long.",
    itinerary: `Ngày 1:
07:00 - Đón khách
09:00 - Đi thuyền khám phá sông
11:30 - Ăn trưa
13:30 - Thăm Làng Gốm Bàu Mai
16:00 - Đến khách sạn
18:00 - Ăn tối

Ngày 2:
07:30 - Ăn sáng
08:30 - Thăm vườn trái cây
11:00 - Ăn trưa
13:00 - Khởi hành về
15:00 - Trả khách`,
    province: "Vĩnh Long",
    price: 1500000,
    duration: "2 ngày 1 đêm",
    maxSlots: 32,
    availableSlots: 32,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
    ],
    departures: [
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 16),
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30),
    ],
  });






  // ==================== COMBO LIÊN TỈNH ====================




  await Tour.insertMany(tours);

  const hotels = [
    // ===== AN GIANG =====
    {
      name: "Saigon An Giang Hotel",
      description:
        "Khách sạn 4 sao trung tâm thành phố Châu Đốc, view đẹp, tiện nghi đầy đủ.",
      province: "An Giang",
      address: "123 Đường Lê Lợi, Phường 3, Thành phố Châu Đốc, An Giang",
      pricePerNight: 800000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Gym", "Xe đưa đón"],
      featured: true,
    },
    {
      name: "Homestay Tràm Trà Sư",
      description:
        "Trải nghiệm sinh sống tại khu vực rừng tràm, không khí trong lành.",
      province: "An Giang",
      address: "Xã Tràm Trà Sư, Huyện Chợ Mới, An Giang",
      pricePerNight: 350000,
      starRating: 2,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Đưa đón sân bay"],
      featured: false,
    },

    // ===== BAC LIEU =====
    {
      name: "Bạc Liêu Saigon Hotel",
      description: "Khách sạn hiện đại ở trung tâm thành phố Bạc Liêu.",
      province: "Bạc Liêu",
      address: "45 Đường 30/4, Phường 2, Thành phố Bạc Liêu, Bạc Liêu",
      pricePerNight: 700000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Xe đưa đón"],
      featured: true,
    },
    {
      name: "Resort Mũi Né Bạc Liêu",
      description: "Resort view biển, bãi biển riêng, yên tĩnh.",
      province: "Bạc Liêu",
      address: "Bãi biển Bạc Liêu, Huyện Hồng Đào, Bạc Liêu",
      pricePerNight: 1200000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Spa"],
      featured: true,
    },

    // ===== BEN TRE =====
    {
      name: "Ben Tre River Resort",
      description: "Resort trên sông, trải nghiệm miệt vườn miền Tây.",
      province: "Bến Tre",
      address: "Sông Hậu, Xã Mỹ Thạnh, Huyện Bàu Bàng, Bến Tre",
      pricePerNight: 900000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Đi xuồng"],
      featured: true,
    },
    {
      name: "Homestay Cái Bè",
      description:
        "Homestay tại chợ nổi Cái Bè, trải nghiệm cuộc sống sông nước.",
      province: "Bến Tre",
      address: "Chợ nổi Cái Bè, Huyện Cái Bè, Bến Tre",
      pricePerNight: 400000,
      starRating: 2,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Ăn sáng"],
      featured: false,
    },

    // ===== CA MAU =====
    {
      name: "Ca Mau Hotel",
      description: "Khách sạn trung tâm thành phố Cà Mau.",
      province: "Cà Mau",
      address: "789 Đường Cách Mạng Tháng 8, Phường 1, TP Cà Mau",
      pricePerNight: 650000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Xe đưa đón"],
      featured: false,
    },
    {
      name: "Resort U Minh Hạ",
      description: "Resort trong khu rừng U Minh, khám phá thiên nhiên.",
      province: "Cà Mau",
      address: "Khu bảo tồn U Minh Hạ, Huyện U Minh, Cà Mau",
      pricePerNight: 850000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Tham quan rừng"],
      featured: true,
    },

    // ===== CAN THO =====
    {
      name: "Saigon Can Tho Hotel",
      description: "Khách sạn 5 sao trung tâm Cần Thơ, view sông Hậu.",
      province: "Cần Thơ",
      address: "1 Hai Bà Trưng, Phường Ninh Kiều, TP Cần Thơ",
      pricePerNight: 1500000,
      starRating: 5,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Spa", "Gym"],
      featured: true,
    },
    {
      name: "Central Hotel Can Tho",
      description: "Khách sạn trung tâm, gần chợ nổi Cái Răng.",
      province: "Cần Thơ",
      address: "456 Đường Nguyễn Văn Linh, Phường An Khánh, TP Cần Thơ",
      pricePerNight: 750000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Xe đưa đón"],
      featured: true,
    },

    // ===== DONG THAP =====
    {
      name: "Saigon Dong Thap Hotel",
      description: "Khách sạn hiện đại ở thành phố Cao Lãnh.",
      province: "Đồng Tháp",
      address: "101 Đường Nguyễn Huệ, Phường 2, TP Cao Lãnh, Đồng Tháp",
      pricePerNight: 700000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Bể bơi"],
      featured: true,
    },
    {
      name: "Resort Đồng Tháp Mười",
      description: "Resort trong khu sinh thái Đồng Tháp Mười.",
      province: "Đồng Tháp",
      address: "Khu sinh thái Đồng Tháp Mười, Huyện Tam Nông, Đồng Tháp",
      pricePerNight: 950000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Tham quan sinh thái"],
      featured: true,
    },

    // ===== HAU GIANG =====
    {
      name: "Hau Giang Hotel",
      description: "Khách sạn trung tâm thành phố Vĩnh Long (thuộc Hậu Giang).",
      province: "Hậu Giang",
      address: "23 Đường 30/4, Phường 1, TP Vĩnh Long, Hậu Giang",
      pricePerNight: 600000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng"],
      featured: false,
    },

    // ===== KIEN GIANG =====
    {
      name: "Vinpearl Resort Phu Quoc",
      description: "Resort 5 sao trên đảo Phú Quốc, view biển tuyệt đẹp.",
      province: "Kiên Giang",
      address: "Bãi Sao, TP Đảo Phú Quốc, Kiên Giang",
      pricePerNight: 2500000,
      starRating: 5,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Spa", "Gym", "Casino"],
      featured: true,
    },
    {
      name: "Saigon Phu Quoc Hotel",
      description: "Khách sạn trung tâm đảo Phú Quốc.",
      province: "Kiên Giang",
      address: "Đường Dương Đông, TP Đảo Phú Quốc, Kiên Giang",
      pricePerNight: 1200000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng"],
      featured: true,
    },
    {
      name: "Resort Nam Du Island",
      description: "Resort trên đảo Nam Du, trải nghiệm biển đảo yên bình.",
      province: "Kiên Giang",
      address: "Đảo Nam Du, Huyện Kiên Hải, Kiên Giang",
      pricePerNight: 900000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Bãi biển riêng"],
      featured: true,
    },

    // ===== LONG AN =====
    {
      name: "Long An Saigon Hotel",
      description: "Khách sạn trung tâm thành phố Tân An.",
      province: "Long An",
      address: "56 Đường Cách Mạng Tháng 8, Phường 1, TP Tân An, Long An",
      pricePerNight: 550000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng"],
      featured: false,
    },

    // ===== SOC TRANG =====
    {
      name: "Soc Trang Hotel",
      description: "Khách sạn trung tâm thành phố Sóc Trăng.",
      province: "Sóc Trăng",
      address: "89 Đường Nguyễn Văn Linh, Phường 2, TP Sóc Trăng",
      pricePerNight: 600000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng"],
      featured: false,
    },
    {
      name: "Khách sạn Khmer Sóc Trăng",
      description: "Khách sạn phong cách kiến trúc Khmer.",
      province: "Sóc Trăng",
      address: "Đường Lê Lợi, Phường 3, TP Sóc Trăng",
      pricePerNight: 800000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Spa"],
      featured: true,
    },

    // ===== TIEN GIANG =====
    {
      name: "Saigon My Tho Hotel",
      description: "Khách sạn trung tâm thành phố Mỹ Tho.",
      province: "Tiền Giang",
      address: "11 Đường Nguyễn Đình Chiểu, Phường 2, TP Mỹ Tho, Tiền Giang",
      pricePerNight: 700000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Bể bơi"],
      featured: true,
    },
    {
      name: "Resort Mekong Tien Giang",
      description: "Resort trên sông Mekong, trải nghiệm miệt vườn.",
      province: "Tiền Giang",
      address: "Xã Thới Sơn, Huyện Châu Thành, Tiền Giang",
      pricePerNight: 1100000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Đi xuồng"],
      featured: true,
    },

    // ===== TRA VINH =====
    {
      name: "Tra Vinh Hotel",
      description: "Khách sạn trung tâm thành phố Trà Vinh.",
      province: "Trà Vinh",
      address: "34 Đường 30/4, Phường 1, TP Trà Vinh",
      pricePerNight: 550000,
      starRating: 3,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng"],
      featured: false,
    },

    // ===== VINH LONG =====
    {
      name: "Vinh Long Saigon Hotel",
      description: "Khách sạn hiện đại trung tâm thành phố Vĩnh Long.",
      province: "Vĩnh Long",
      address: "67 Đường Nguyễn Huệ, Phường 1, TP Vĩnh Long",
      pricePerNight: 750000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Nhà hàng", "Bể bơi"],
      featured: true,
    },
    {
      name: "Resort Vĩnh Long River",
      description: "Resort view sông Hậu, yên tĩnh.",
      province: "Vĩnh Long",
      address: "Sông Hậu, Xã Mỹ Thuận, Huyện Bến Tre, Vĩnh Long",
      pricePerNight: 950000,
      starRating: 4,
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      ],
      amenities: ["Wifi", "Bể bơi", "Nhà hàng", "Đi thuyền"],
      featured: true,
    },
  ];

  await Hotel.insertMany(hotels);

  console.log("Seed completed!");
  console.log("Admin: admin@mientay.vn / admin123");
  console.log("Customer: customer@mientay.vn / 123456");
  console.log("Provinces:", PROVINCES.join(", "));
  console.log("Users created:", admin.email, customer.email);
  console.log("Total tours created:", tours.length);
  console.log("Total hotels created:", hotels.length);

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
