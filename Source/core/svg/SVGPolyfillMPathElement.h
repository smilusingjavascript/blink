// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef SVGPolyfillMPathElement_h
#define SVGPolyfillMPathElement_h

#include "core/svg/SVGElement.h"

namespace blink {

class SVGPolyfillMPathElement : public SVGElement {
    DEFINE_WRAPPERTYPEINFO();
public:
    DECLARE_NODE_FACTORY(SVGPolyfillMPathElement);

private:
    explicit SVGPolyfillMPathElement(Document&);
};

} // namespace blink

#endif // SVGPolyfillMPathElement_h
