import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from '../styled';
import AboutMenu from '../AboutMenu/Index';

const Acknowledgments = () => {
  return (
    <Styled.TextBlock>
      <AboutMenu />
      <Styled.Title>Acknowledgments</Styled.Title>
      <p>For generous financial support, we are grateful to the University of Pennsylvania’s <a href="https://cseri.sas.upenn.edu/" target='_blank' rel="noopenner noreferrer">Center for the Study of Ethnicity, Race, and Immigration</a>, <a href="https://pricelab.sas.upenn.edu/" target='_blank' rel="noopenner noreferrer">Price Lab for Digital Humanities</a>, and the <a href="https://research.upenn.edu/funding-opportunity/university-research-foundation-research-grant-2/" target='_blank' rel="noopenner noreferrer">University Research Foundation</a>. These grant funds underwrote the work of our fantastic team of Penn undergraduate student-researchers who painstakingly located thousands of properties: Leo Biehl, Shaanti Choi-Bose, Hadley Degregoris, David Deng, Taryn Flaherty, Max Hall, Avi Loren, Mabel Moosbrugger, Jeremy Morton, Connor Nakamura, Niheer Patel, Carolina Payeras, Rajat Ramesh, Norah Rami, Iyanna Rogers, Mitali Sarnobat, Ella Sohn, Jack Starobin, Claire Sun, and Jake Zubkoff. We would also like to thank graduate students Joshua Rosen and Russell Star-Lack for providing essential administrative and research support.</p>
      <p>
        The Price Lab’s Stewart Varner has been an invaluable consultant and networker at each stage of development. We are grateful to Laura Newman Eckstein, Ben Liebersohn, and J. D. Porter for their assistance with data analysis and map preparation. Robert Nelson prepared the public facing map and website, provided essential consultation throughout the process, and have improved this project in innumerable ways.</p>
      <p>For their critical engagement with the journal article and mapping project at various stages of development, we are grateful to participants in the <a href="https://www.bc.edu/bc-web/schools/morrissey/departments/history/events/history-lecture-series.html" target='_blank' rel="noopenner noreferrer">Boston College History Department Lecture Series</a>, the  <a href="https://www.humanitiesurbanismdesign.org/" target='_blank' rel="noopenner noreferrer">Humanities+Urbanism+Design</a> working group at Penn, and the <a href="https://live-sas-www-history.pantheon.sas.upenn.edu/calendar/penn-economic-history-forum" target='_blank' rel="noopenner noreferrer">Penn Economic History Forum</a>; audiences at the American Political History Conference and Society for American City and Regional Planning History; and a fantastic group of scholars, including Bench Ansfield, N. D. B. Connolly, Lily Geismer, Garrett Dash Nelson, Katherine Nelson, Rebecca Marchiel, Scott Markley, Pedro Regalado, Akira Drake Rodriguez, Thomas J. Sugrue, Keeanga-Yamahtta Taylor, and three anonymous readers for the <cite>Journal of American History</cite>.
      </p>


    </Styled.TextBlock>
  );
}

export default Acknowledgments;