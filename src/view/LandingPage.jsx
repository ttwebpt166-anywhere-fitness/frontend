import { useHistory } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';

const LandingPage = () => {
  return (
    <div className="Members">
      <Jumbotron fluid className="customJumbotron">
        <div className="customJumbotron_par">
          <p>
            These days, fitness classes can be held anywhere... a park, an unfinished basement or a
            garage... not just at a traditional gym.
          </p>
          <p>
            Certified fitness instructors need an easy way to take the awkwardness out of attendance
            taking and client payment processing.
          </p>
        </div>
      </Jumbotron>
      <div className="squares">
        <div className="square" id="square-a">
          <h2>Orci maecenas</h2>
          <p>
            Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus
            condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna
            pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et
            sagittis tempus.
          </p>

          <a href="#">Learn more</a>
        </div>

        <div className="square" id="square-b">
          <h2>Rhoncus magna</h2>
          <p>
            Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus
            condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna
            pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et
            sagittis tempus.
          </p>

          <a href="#">Learn more</a>
        </div>

        <div className="square" id="square-c">
          <h2>Sed nunc ligula</h2>
          <p>
            Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus
            condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna
            pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et
            sagittis tempus.
          </p>

          <a href="#">Learn more</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
