import * as React from 'react';

// Definiendo estilos para Container
const style = (center: boolean) => ({
 alignItems: center ? 'center' : undefined,
 display: 'flex',
 flexDirection: 'column',
 justifyContent: center ? 'center' : undefined,
 padding: '10px 15px',
}) as React.CSSProperties

interface IContainerProps {
 center?: boolean,
 viewLogin?: boolean 
}

export default class Container extends React.Component<IContainerProps> {
 public render() {
  const { children, center = false} = this.props
  return (
   <div style={style(center)}>
    {children}
   </div>
  )
 }
}