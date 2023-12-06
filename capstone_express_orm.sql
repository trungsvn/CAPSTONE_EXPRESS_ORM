/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_luu` date DEFAULT NULL,
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(50) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 1, 1, '2023-11-08', 'ngon');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 2, '2023-09-27', 'bình thường');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 3, 3, '2023-07-26', 'rất tuyệt');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 4, 4, '2023-04-27', 'không ngon'),
(5, 5, 5, '2023-08-23', 'vừa ăn'),
(6, 6, 6, '2023-04-23', 'hơi nhạt'),
(7, 7, 7, '2023-05-12', 'mặn'),
(8, 8, 8, '2023-08-01', 'nhạt'),
(9, 9, 9, '2023-12-11', 'cay'),
(10, 10, 10, '2023-05-21', 'nguội');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Gà giòn sốt kem ', '/images/ga_gion_sot_kem', 'Mỳ Ý gà giòn sốt kem : Miếng gà bên trong mọng nước, bên ngoài giòn rụm', 1);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'Xúc xích sốt kem nấm', '/images/xuc_xich_sot_kem_nam', 'Mỳ Ý xúc xích sốt kem nấm : Vị thơm lừng từ xúc xích áp chảo với lá thyme', 2);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'Hải sản sốt cà ', '/images/hai_san_sot_ca', 'Mỳ Ý hải sản sốt cà : Vị chua ngọt từ sốt Cà', 3);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'Rau củ sốt kem', '/images/rau_cu_sot_kem', 'Mỳ ý rau củ sốt kem: Vị béo mặn từ sốt Kem', 4),
(5, 'Carbonara', '/images/Carbonara', 'Mỳ ý truyền thống Carbonara :  Vị béo mặn từ sốt Carbonara, là hỗn hợp từ trứng và phô mai parmesan', 5),
(6, 'Bolognese', '/images/Bolognese', 'Mỳ Ý truyền thống Bolognese : Vị thơm từ lá basil và bơ lạc', 6),
(7, 'Aglio e Olio', '/images/Aglio e Olio', 'Mỳ Ý truyền thống Aglio e Olio : Vị mặn đặc trưng của sốt Aglio e Olio, là hỗn hợp gồm dầu olive, lá parsley, phô mai', 7),
(8, 'Thịt xông khói sốt kem ', '/images/thit_xong_khoi_sot_kem', 'Mỳ Ý thịt xông khói sốt kem : Vị béo mặn từ sốt Kem', 8),
(9, 'Rau củ sốt cà ', '/images/rau_cu_sot_ca', 'Mỳ Ý rau củ sốt cà : Vị chua ngọt từ sốt Cà', 9),
(10, 'Còi sò điệp sốt phố ', '/images/coi_so_diep_sot_pho', 'Mỳ Ý còi sò điệp sốt phố : Vị ngọt, thơm từ còi sò điệp áp chảo với lá thyme', 10);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 1, '2023-03-21');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(2, 2, '2023-09-14');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(3, 3, '2023-02-06');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(4, 4, '2023-05-11'),
(5, 5, '2023-08-16'),
(6, 6, '2023-12-29'),
(7, 7, '2023-01-08'),
(8, 8, '2023-04-07'),
(9, 9, '2021-03-17'),
(10, 10, '2019-01-07');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `password`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'tienlinh@hotmail.com', '4', 'Nguyễn Tiến Linh', 27, '/images/avatars/tienlinh.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `password`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'tiendung@gmail.com', '6', 'Bùi Tiến Dũng', 28, '/images/avatars/tiendung.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `password`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'duymanh@hotmail.com', '4', 'Đặng Duy Mạnh', 31, '/images/avatars/duymanh.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `password`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'hoangduc@hotmail.com', '2', 'Nguyễn Hoàng Đức', 33, '/images/avatars/hoangduc.jpg'),
(5, 'quanghai@yahoo.com', '8', 'Nguyễn Quang Hải', 32, '/images/avatars/quanghai.jpg'),
(6, 'vanthanh@yahoo.com', '7', 'Vũ Văn Thanh', 21, '/images/avatars/vanthanh.jpg'),
(7, 'vanduc@hotmail.com', '3', 'Phan Văn Đức', 27, '/images/avatars/vanduc.jpg'),
(8, 'vanhau@yahoo.com', '8', 'Đoàn Vân Hậu', 28, '/images/avatars/vanhau.jpg'),
(9, 'vanlam@gmail.com', '1', 'Đặng Văn Lâm', 21, '/images/avatars/vanlam.jpg'),
(10, 'hungdung@hotmail.com', '2', 'Đỗ Hùng Dũng', 25, '/images/avatars/hungdung.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;