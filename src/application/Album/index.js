import React, { useEffect, useState } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/Header";

const Album = (props) => {
  const [showStatus, setShowStatus] = useState(true);

  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      unmountOnExit
      appear={true}
      onExited={props.history.goBack}
    >
      <Container>
        <Header title="返回" handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);