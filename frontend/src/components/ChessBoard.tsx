import { Color, PieceSymbol, Square } from 'chess.js'
import { useState } from 'react'
import { MOVE } from '../screens/Game'

const ChessBoard = ({
	chess,
	board,
	socket,
	setBoard,
}: {
	board: ({
		square: Square
		type: PieceSymbol
		color: Color
	} | null)[][]
	socket: WebSocket
	setBoard: any
	chess: any
}) => {
	const [from, setFrom] = useState<null | Square>(null)

	return (
		<div className="text-white-200">
			{board.map((row, i) => {
				return (
					<div key={i} className="flex">
						{row.map((square, j) => {
							const squareRepresentation = (String.fromCharCode(
								97 + (j % 8)
							) +
								'' +
								(8 - i)) as Square
							return (
								<div
									onClick={() => {
										if (!from) {
											setFrom(squareRepresentation)
											console.log(squareRepresentation)
										} else {
											socket.send(
												JSON.stringify({
													type: MOVE,
													payload: {
														move: {
															from,
															to: squareRepresentation,
														},
													},
												})
											)
											const move = chess.move({
												from,
												to: squareRepresentation,
											})
											if (move) {
												setBoard(chess.board())
												console.log({
													from,
													to: squareRepresentation,
												})
											}
											setFrom(null)
										}
									}}
									key={j}
									className={`w-16 h-16 ${
										(i + j) % 2 === 0
											? 'bg-green-600'
											: 'bg-white'
									}`}
								>
									<div className="w-full justify-center flex h-full">
										<div className="h-full justify-center flex flex-col">
											{square ? (
												<img
													className="w-10 "
													src={`/src/assets/chessPieces/${
														square.color === 'b'
															? `${square.type}.png`
															: `${square.type.toUpperCase()} copy.png`
													}`}
													alt={`${square.type} piece`}
												/>
											) : null}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

export default ChessBoard
