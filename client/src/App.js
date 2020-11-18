import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Topics from './components/topics';
import globalStyles from './components/common/globalStyles';

function App() {
  return (
    <Router>
      <div className="root">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/topics" component={Topics}/>
        </Switch>
      </div>
      <style jsx="true" global="true">{`
            body{
                background-color: #f2fcff;
                box-sizing: border-box;
            }
            input, textarea {
              border: none;
              outline: none;
            }
            a {
              cursor: pointer; 
              text-decoration: none;
            }
            ul{
              list-style: none;
              margin: 0;
              padding: 0;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              margin: 0;
            }
            ::placeholder {
              color: #80808077;
            }

            .main {
              background: ${globalStyles.colors.boxshadow};
              width: 40%;
              margin: 0 auto;
              min-height: 100vh;
          }
          .add {
              color: ${globalStyles.colors.white};
              background: ${globalStyles.colors.lightblue};
              border: 5px solid ${globalStyles.colors.boxshadow};
              border-radius: 0.2em;
              width: 120px;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 auto;
          }
          .inputwrapper {
              border: 5px solid ${globalStyles.colors.boxshadow};
              background: ${globalStyles.colors.darkbackground};
              border-radius: 0.2em;
              display: flex;
              flex-direction: column;
              margin: 15px 10px;
          }
          .inputtitle{
              font-size: ${globalStyles.fontSize.large};
              color: ${globalStyles.colors.white};
              margin-bottom: 5px;
          }
          input, textarea {
              font-size: ${globalStyles.fontSize.large}; 
              background: ${globalStyles.colors.whitesmoke};  
          }
          input{
              height: 30px;
          }
          .submit{
              color: ${globalStyles.colors.white};
              background: ${globalStyles.colors.red};
              border: 5px solid ${globalStyles.colors.boxshadow};
              border-radius: 0.2em;
              width: 70%;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 auto;
          }
          .alertmsg {
              color: ${globalStyles.colors.white};
              font-size: ${globalStyles.fontSize.large};
              font-weight: ${globalStyles.fontWeight.semiBold};
              margin: 10px auto;
              text-align: center;
              display: block;
          }
          .coursecard{
              background: ${globalStyles.colors.white};
              color: ${globalStyles.colors.darkblue};
              margin: 10px;
              padding: 10px;
              border-radius: 0.2em;
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          .coursename{
              font-size: ${globalStyles.fontSize.extraLarge};
              font-weight: ${globalStyles.fontWeight.regular};
          }
          .coursedesc{
              margin: 5px 0;
          }
          .next{
              width: 40px;
          }
          .delete{
              background: ${globalStyles.colors.red};
              color: ${globalStyles.colors.white};
              display: block;
              width: 60px;
              height: 21px;
              text-align: center;
              border-radius: 0.2em;
          }
        `}</style>
    </Router>
  );
}

export default App;
