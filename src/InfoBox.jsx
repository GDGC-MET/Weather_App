import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function InfoBox({info}){
    const INITIAL_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmrAp8l8AI5fsfgcWD6yf2AdPbWNe8wOBDg&s";


    return(
        <div className="InfoBox">
            <h3>Weather Information of {info.city}</h3>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={INITIAL_IMG}
                title="green iguana"/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {info.city}
                </Typography>
                <Typography variant="body2" color="text.primary" component={"span"}>
                        <>Temperature = {info.temp}&deg;F</>
                        <br />
                        <>Maximum Temperature = {info.tempMax}&deg;F</>
                        <br />
                        <>Minimum Temperature = {info.tempMin}&deg;F</>
                        <br />
                        <>Humidity = {info.humidity}</>
                        <br />
                        <>The weather feels like {info.feelsLike}&deg;F and</>
                </Typography>
            </CardContent>
            </Card>
        </div>
    );
}