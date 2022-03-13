import InstagramIcon from '@mui/icons-material/Instagram';
export default function Footer(props) {
     return (
          <div className={props.className}>
               <div className="footer-trademark">Saturna</div>
               <div className="footer-contact">
                    <div>21 boulevard Gabriel Guist'Hau 44100 Nantes</div>
                    <br />
                    <a href="tel:+33675651335">
                         <i className="material-icons">phone</i>06 75 65 13 35
                    </a>

                    <p>© 2022 by Positive Coding.</p>
               </div>
               <div className="footer-media">
                    <p>
                         <a href="">
                              <i className="material-icons">facebook</i>
                         </a>
                         <a href="https://www.instagram.com/saturna_nantes/">
                              <InstagramIcon />
                         </a>
                    </p>
               </div>
          </div>
     );
}
