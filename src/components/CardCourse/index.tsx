// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";

// function CardCourse({ imageUrl, name, description, id }) {
//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         alt="green iguana"
//         height="250"
//         image={imageUrl}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {description}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Link to={"#"} className={"tw-no-underline"}>
//           <Button size="small" variant={"contained"}>
//             Xem chi tiết
//           </Button>
//         </Link>
//         <Button size="small">Xóa</Button>
//       </CardActions>
//     </Card>
//   );
// }

// export default CardCourse;

// @ts-ignore
import styles from './style.module.scss';
// @ts-ignore
import images from '~/assets/images/default_classes2.jpg';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IClass } from '~/models/IClass';

type Prop = Pick<IClass, 'name' | '_id' | 'code' | 'teacher'>;

function CardCourse({ name, _id, code, teacher }: Prop) {
    return (
        <Link to={`/class/${_id}/newsfeed`} className={styles.cover}>
            <div className={styles.course}>
                <div className={styles.img_wrap}>
                    <img className={styles.img} src={images} alt="" />
                </div>
                <div className={styles.contant}>
                    <div className={styles.text_wrap}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.code}>{code}</p>
                    </div>
                    <div className={styles.teachers}>
                        {teacher.map((teacher:any, index:any) => {
                            const teacherInitial = teacher.name.charAt(0).toUpperCase();
                            return (
                                <div key={index} className={styles.avatar_wrap}>
                                    {teacher.avatar ? (
                                        <img
                                            className={styles.avatar}
                                            src={teacher.avatar}
                                            alt="Teacher Avatar"
                                        />
                                    ) : (
                                        <div className={styles.avatar_placeholder}>
                                            {teacherInitial}
                                        </div>
                                    )}
                                    <p className={styles.teacher_name}>{teacher.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default memo(CardCourse);