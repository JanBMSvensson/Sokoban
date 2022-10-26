

/*  data-characters
    x = Wall, processor
    X = Wall, bios
    B = Bug, movable
    b = Bug, movable on recycle area
    P = Player, starting position
    R = Recycle area for the bugs (reuse them anywhere you like)
    . = empty, inside game
    (space) = empty, outside game
*/

const Levels = [
    {
        width: 13,
        height: 9,
        theme: 1,
        copyright: "",
        data:
            "   xxxxx     " +
            "   x...xxxx  " +
            "   x...X..x  " +
            "   xx....Rx  " +
            "  xxx.xxxRx  " +
            "  x.B.x xRx  " +
            "  x.BBx xxx  " +
            "  xP..x      " +
            "  xxxxx     C"
    }
    , {
        width: 10,
        height: 9,
        theme: 2,
        copyright: "",
        data:
            "C xxxxxxx " +
            "  x.....x " +
            "  x.B.P.x " +
            "xxxxx.x.x " +
            "x.B.....x " +
            "x..XBxx.xx" +
            "xRRB..x..x" +
            "xRR......x" +
            "xxxxxxxxxx"
    }
    , {
        width: 10,
        height: 8,
        theme: 1,
        copyright: "",
        data:
            "  xxxxxxxx" +
            "  xR...B.x" +
            "  xRB..X.x" +
            "C xRx.x..x" +
            "  xxx.x.xx" +
            "   x.B..x " +
            "   xP.xxx " +
            "   xxxxx  "
    }
    , {
        width: 10,
        height: 9,
        theme: 2,
        copyright: "",
        data:
            "      C   " +
            "          " +
            " xxxxxxxx " +
            "xxRRx...x " +
            "x.RRx.B.xx" +
            "x.P.B..B.x" +
            "xxBxXx...x" +
            " x.....xxx" +
            " xxxxxxx  "

    }
    , {
        width: 19,
        height: 11,
        theme: 1,
        copyright: "",
        data:
            "    xxxxx          " +
            "    x...x          " +
            "    xB..x          " +
            "  xxx..Bxx         " +
            "  x..B.B.x         " +
            "xxx.x.xx.x   xxxxxx" +
            "x...X.xx.xxxxx..RRx" +
            "x.B..B..........RRx" +
            "xxxxx.xxx.xPxx..RRx" +
            "    x.....xxxxxxxxx" +
            "C   xxxxxxx        "
}
    , {
        width: 14,
        height: 10,
        theme: 3,
        copyright: "",
        data:
            "xxxxxxxxxxxx  " +
            "xRR..x.....xxx" +
            "xRR..x.B..B..x" +
            "xRR..xBxxxx..x" +
            "xRR....P.xx..x" +
            "xRR..x.X..B.xx" +
            "xxxxxx.xxB.B.x" +
            "  x.B..B.B.B.x" +
            "  x....x.....x" +
            "C xxxxxxxxxxxx"
    }
    , {
        width: 17,
        height: 10,
        theme: 1,
        copyright: "",
        data:
            "C       xxxxxxxx " +
            "        x.....Px " +
            "        x.BxB.xx " +
            "        x.B..Bx  " +
            "        xxB.B.x  " +
            "xxxxxxxxx.B.X.xxx" +
            "xRRRR..xx.B..B..x" +
            "xxRRR....B..B...x" +
            "xRRRR..xxxxxxxxxx" +
            "xxxxxxxx         "
        }
    , {
        width: 11,
        height: 7,
        theme: 2,
        copyright: "",
        data:
            "      xxxxx" +
            "   xxxx...x" +
            "xxxx..BbR.x" +
            "x..BbR...Xx" +
            "x.P...xxxxx" +
            "x..xxxx    " +
            "xxxx      C"
    }, {
        width: 11,
        height: 8,
        theme: 3,
        copyright: "Thinking Rabbit",
        data:
            " xxxxx     " +
            " x...xxxxx " +
            " x.B.x...x " +
            " x...xBX.x " +
            " xxxB....x " +
            "  x...xxxx " +
            "  x.PRRRx  " +
            "  xxxxxxx C"
    }
];
