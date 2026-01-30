/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { CustomCardProps, CustomCardStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<CustomCardStylesProps>`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : 'none'};
  background-position: ${({ backgroundPositionX, backgroundPositionY }) =>
    `${backgroundPositionX || 0}% ${backgroundPositionY || 0}%`};
  background-size: ${({ backgroundSize }) => backgroundSize || 'cover'};
  background-repeat: ${({ backgroundRepeat }) => backgroundRepeat || 'no-repeat'};

  h3 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) =>
      theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) =>
      theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) =>
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
  }
`;

export default function CustomCard(props: CustomCardProps) {
  const { data, height, width } = props;
  const value = calculateMetric(data);
  const rootElem = createRef<HTMLDivElement>();
  
  function rgbaToCss(color?: any): string {
    if (!color) return '#FFFFFF';
    const { r, g, b, a } = color;
    if (a === undefined || a === 1) {
      return `rgb(${r}, ${g}, ${b})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
      backgroundImage={props.backgroundImage}
      backgroundColor={rgbaToCss(props.backgroundColor)}
      backgroundPositionX={props.backgroundPositionX}
      backgroundPositionY={props.backgroundPositionY}
      backgroundSize={props.backgroundSize}
      backgroundRepeat={props.backgroundRepeat}
    >
      <h3>{props.headerText}</h3>
      <div
        style={{
          fontSize: '64px',
          fontWeight: 700,
          textAlign: 'center',
          marginTop: '24px',
        }}
      >
        {value.toLocaleString('es-AR', {
          maximumFractionDigits: 2,
        })}
      </div>
    </Styles>
  );
}

//TODO ESTO ESTA MUY MAL HAY QUE RECALCULAR LA LOGICA
function calculateMetric(rows: Record<string, any>[]): number {
  if (!rows || rows.length === 0) return 0;

  const metricKey = Object.keys(rows[0]).find(
    key => key !== 'name'
  );

  if (!metricKey) return 0;

  const values = rows
    .map(row => Number(row[metricKey]))
    .filter(v => !isNaN(v));

  if (values.length === 0) return 0;

  return values.reduce((a, b) => a + b, 0) / values.length;
}




